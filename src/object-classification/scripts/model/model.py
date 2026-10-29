import os
import sys
import json
import time
import random
import numpy as np
import tensorflow as tf
from pathlib import Path
from typing import Any
from typing import List
from typing import Dict
from typing import Tuple
from collections import defaultdict
from dataclasses import dataclass
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.callbacks import Callback
from .manifest import Manifest

#
# Class: Record
# Since: 1.0.0
#

@dataclass(frozen=True)
class Record:
    labels: Tuple[int, ...]
    image: str

#
# Class: Model
# Since: 1.0.0
#

class Model:

    # --------------------------------------------------------------------------
    # Methods
    # --------------------------------------------------------------------------

    #
    # Constructor
    # Since: 1.0.0
    #

    def __init__(
        self,
        weights_path: Path,
        manifest_path: Path,
        image_size: int,
        image_chan: int,
        batch_size: int,
        dropout_rate: float,
        freeze_backbone: bool,
        seed: int
    ) -> None:

        self.weights_path = weights_path
        self.manifest_path = manifest_path
        self.image_size = image_size
        self.image_chan = image_chan
        self.batch_size = batch_size
        self.dropout_rate = dropout_rate
        self.freeze_backbone = freeze_backbone
        self.seed = seed

        self.manifest = Manifest(manifest_path)

        self.num_classes = len(self.manifest.labels)

        self.prepare()
        self.compile()

    #
    # Method: train
    # Since: 1.0.0
    #

    def train(self,
        epochs: int,
        callback: Callback,
        checkpoints_path: Path,
        tensorboard_path: Path
    ) -> None:

        callbacks: List[Callback] = [

            keras.callbacks.ModelCheckpoint(
               	monitor="val_accuracy",
               	mode="max",
               	save_best_only=True,
               	filepath=str(checkpoints_path)
            ),

            keras.callbacks.EarlyStopping(
               	monitor="val_accuracy",
               	mode="max",
               	patience=15,
               	min_delta=0.001,
               	restore_best_weights=True
            ),

            keras.callbacks.ReduceLROnPlateau(
               	monitor="val_loss",
               	factor=0.5,
               	patience=5,
               	cooldown=2,
               	min_lr=3e-6,
               	verbose=1,
            ),

            keras.callbacks.TensorBoard(log_dir=str(tensorboard_path)),

        ] + [callback]

        self.model.fit(
            self.train_ds,
            validation_data=self.valid_ds,
            epochs=epochs,
            callbacks=callbacks,
            verbose=0
        )

    #
    # Method: valid
    # Since: 1.0.0
    #

    def valid(self) -> Tuple[Dict[str, float], Dict[int, Dict[str, Any]]]:

        metrics = self.model.evaluate(
            self.valid_ds,
            return_dict=True,
            verbose=0
        )

        loss      = float(metrics.get("loss",      np.nan))
        accuracy  = float(metrics.get("accuracy",  np.nan))
        precision = float(metrics.get("precision", np.nan))
        recall    = float(metrics.get("recall",    np.nan))
        roc_auc   = float(metrics.get("roc_auc",   np.nan))
        pr_auc    = float(metrics.get("pr_auc",    np.nan))
        f1        = float("nan")

        if np.isfinite(precision) and np.isfinite(recall) and (precision + recall) > 0:
            f1 = float(2.0 * precision * recall / (precision + recall))

        data = {
            "loss":      round(loss,      6),
            "accuracy":  round(accuracy,  6),
            "precision": round(precision, 6),
            "recall":    round(recall,    6),
            "rocAuc":    round(roc_auc,   6),
            "prAuc":     round(pr_auc,    6),
            "f1":        round(f1,        6),
        }

        class_data = self.valid_per_class()

        return data, class_data

    #
    # Method: valid_per_class
    # Since: 1.0.0
    #

    def valid_per_class(self) -> Dict[int, Dict[str, Any]]:

        y_true = np.concatenate([y.numpy() for _, y in self.valid_ds], axis=0)
        y_prob = self.model.predict(self.valid_ds, verbose=0)
        y_pred = (y_prob >= 0.5).astype(np.float32)

        data: Dict[int, Dict[str, Any]] = {}

        for index in range(self.num_classes):

            true = y_true[:, index]
            pred = y_pred[:, index]

            tp = float(np.sum((true == 1) & (pred == 1)))
            fp = float(np.sum((true == 0) & (pred == 1)))
            fn = float(np.sum((true == 1) & (pred == 0)))

            support = int(np.sum(true == 1))

            precision = tp / (tp + fp) if (tp + fp) > 0 else float("nan")
            recall    = tp / (tp + fn) if (tp + fn) > 0 else float("nan")
            f1        = float("nan")

            if np.isfinite(precision) and np.isfinite(recall) and (precision + recall) > 0:
                f1 = 2.0 * precision * recall / (precision + recall)

            entry: Dict[str, Any] = {"support": support}

            # NaN can't round-trip through JSON, so metrics that are
            # undefined for this class (e.g. no validation support) are
            # left out rather than emitted as an unparsable token.
            if np.isfinite(precision):
                entry["precision"] = round(precision, 6)

            if np.isfinite(recall):
                entry["recall"] = round(recall, 6)

            if np.isfinite(f1):
                entry["f1"] = round(f1, 6)

            data[index] = entry

        return data

    #
    # Method: export
    # Since: 1.0.0
    #

    def export(
        self,
        quantization: str,
        filepath: Path,
        filename: str,
    ) -> Path:

        filepath.mkdir(parents=True, exist_ok=True)

        converter = tf.lite.TFLiteConverter.from_keras_model(self.model)

        if quantization == "fp32":
            filename = f"{filename}_fp32.tflite"
            converter.optimizations = [tf.lite.Optimize.DEFAULT]
            converter.target_spec.supported_types = [tf.float32]

        if quantization == "fp16":
            filename = f"{filename}_fp16.tflite"
            converter.optimizations = [tf.lite.Optimize.DEFAULT]
            converter.target_spec.supported_types = [tf.float16]

        model = converter.convert()

        path = filepath / filename
        path.write_bytes(model)

        return path

    # --------------------------------------------------------------------------
    # Private API
    # --------------------------------------------------------------------------

    #
    # Method: prepare
    # Since: 1.0.0
    # Hidden
    #

    def prepare(self) -> None:

        images = self.manifest.images
        labels = self.manifest.labels

        records: List[Record] = []

        # The manifest is the single source of truth for which annotations
        # qualify for training (e.g. confirmed-only vs. confirmed+suggested):
        # it's built that way on the JS side, so every annotation found here
        # is trusted as-is, with no status filtering.
        for image in images.values():

            label_ids = set()

            for annotation in image.get("annotations", []):

                label = labels.get(annotation["label"])

                if not label:
                    continue

                label_ids.add(int(label["id"]))

            if not label_ids:
                continue

            records.append(Record(
                labels=tuple(sorted(label_ids)),
                image=str(image["filepath"])
            ))

        train_records, valid_records = split(records, size=0.2, seed=self.seed)

        if not train_records or not valid_records:
            raise ValueError(
                f"Not enough confirmed annotations to build a train/validation split "
                f"({len(records)} labeled image(s) found). Confirm more annotations and try again."
            )

        self.train_ds = self.dataset(train_records, self.image_size, self.batch_size, self.num_classes)
        self.valid_ds = self.dataset(valid_records, self.image_size, self.batch_size, self.num_classes)

        self.split_stats = {
            "total": len(records),
            "train": len(train_records),
            "valid": len(valid_records),
            "trainPerClass": count_per_class(train_records),
            "validPerClass": count_per_class(valid_records),
        }

    #
    # Method: compile
    # Since: 1.0.0
    # Hidden
    #

    def compile(self) -> None:

        #
        # Creates the bacbone.
        # Uses the mobilenet feature extractor without the final
        # classification head.
        #

        backbone = tf.keras.applications.MobileNetV2(

            input_shape=(
                self.image_size,
                self.image_size,
                self.image_chan
            ),

            include_top=False,

            weights=None
        )

        backbone.load_weights(str(self.weights_path))

        #
        # Freezes the backbone.
        # Prevent the model from updating weights during training
        # because we're using a small dataset.
        #

        if self.freeze_backbone:
            backbone.trainable = False

        #
        # Creates the input layer.
        # Defines the shape of the input tensor.
        #

        inputs = layers.Input(
            shape=(
                self.image_size,
                self.image_size,
                self.image_chan
            )
        )

        #
        # Creates the augmentation pipeline layer.
        # Adds random varations to the images to make the model more robust.
        #

        x = keras.Sequential([
             layers.RandomFlip("horizontal"),
             layers.RandomZoom(0.05,     fill_mode="reflect"),
             layers.RandomRotation(0.03, fill_mode="reflect"),
             layers.RandomContrast(0.05),
         ], name="augmentation")(inputs)

        #
        # Creates the preprocessing layer.
        # The model expect input in a specific numeric range and format.
        #

        x = layers.Lambda(tf.keras.applications.mobilenet_v2.preprocess_input, name="preprocess")(x)

        #
        # Set the backbone in inference mode.
        # This is critical on tiny datasets.
        #

        x = backbone(x, training=False)

        #
        # Creates the global average pooling layer.
        # This gives a compact per-image feature vector.
        #

        x = layers.GlobalAveragePooling2D()(x)

        #
        # Creates the dropout layer.
        # Acts as regularization and reduces overfitting.
        #

        if self.dropout_rate > 0:
            x = layers.Dropout(self.dropout_rate)(x)

        #
        # Creates the sigmoid layer.
        # Each output neuron is an independent probability, since an image
        # can carry more than one label at once.
        #

        outputs = layers.Dense(self.num_classes, activation="sigmoid")(x)

        #
        # Creates and compile the model.
        #

        model = keras.Model(
            inputs,
            outputs,
            name="mobilenetv2_classifier"
        )

        model.compile(
            optimizer=keras.optimizers.legacy.Adam(learning_rate=1e-3),
            loss=keras.losses.BinaryCrossentropy(label_smoothing=0.0),
            metrics=[
                keras.metrics.BinaryAccuracy(name="accuracy"),
                keras.metrics.Precision(name="precision"),
                keras.metrics.Recall(name="recall"),
                keras.metrics.AUC(curve="ROC", name="roc_auc"),
                keras.metrics.AUC(curve="PR", name="pr_auc"),
            ],
        )

        self.model = model

    #
    # Method: dataset
    # Since: 1.0.0
    # Hidden
    #

    def dataset(
        self,
        records: List[Record],
        image_size: int,
        batch_size: int,
        num_classes: int
    ) -> Any:

        images = [s.image for s in records]

        labels = np.zeros((len(records), num_classes), dtype=np.float32)

        for i, s in enumerate(records):
            for label in s.labels:
                labels[i, label] = 1.0

        dataset = tf.data.Dataset.from_tensor_slices((images, labels))

        def mapper(image_data, y):
            return decode(
                image_data,
                image_size
            ), y

        # Deterministic pipeline: single-threaded map, prefetch(1)
        dataset = dataset.map(mapper, num_parallel_calls=1)
        dataset = dataset.batch(batch_size)
        dataset = dataset.prefetch(1)

        opts = tf.data.Options()
        opts.experimental_deterministic = True
        opts.threading.private_threadpool_size = 1
        dataset = dataset.with_options(opts)

        return dataset

# ------------------------------------------------------------------------------
# Private API
# ------------------------------------------------------------------------------

#
# Method: split
# Since: 1.0.0
# Hidden
#

def split(records: List[Record], size: float, seed: int):

    # Buckets by the exact label combination, so images sharing the same
    # set of labels are split proportionally between train and valid.
    buckets: Dict[Tuple[int, ...], List[Record]] = defaultdict(list)

    for s in records:
        buckets[s.labels].append(s)

    rng = random.Random(seed)
    train_records: List[Record] = []
    valid_records: List[Record] = []

    for _, group in buckets.items():

        rng.shuffle(group)

        # A bucket with a single record must stay in train, otherwise
        # that label combination would never be trained on at all.
        k = max(1, int(len(group) * size)) if len(group) > 1 else 0

        valid_records.extend(group[:k])
        train_records.extend(group[k:])

    rng.shuffle(train_records)
    rng.shuffle(valid_records)

    return train_records, valid_records

#
# Function: count_per_class
# Since: 1.0.0
# Hidden
#

def count_per_class(records: List[Record]) -> Dict[int, int]:

    counts: Dict[int, int] = defaultdict(int)

    for record in records:
        for label in record.labels:
            counts[label] += 1

    return dict(counts)

#
# Function: decode
# Since: 1.0.0
# Hidden
#

def decode(path: tf.Tensor, image_size: int) -> tf.Tensor:
	bytes = tf.io.read_file(path)
	image = tf.image.decode_image(bytes, channels=3, expand_animations=False)
	image.set_shape([None, None, 3])
	image = tf.image.resize(image, [image_size, image_size])
	return tf.cast(image, tf.float32)  # 0..255
