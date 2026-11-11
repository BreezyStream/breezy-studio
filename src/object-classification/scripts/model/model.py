import copy
import math
import random
import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image
from pathlib import Path
from typing import Any
from typing import Callable
from typing import Dict
from typing import List
from typing import Tuple
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass
from .augment import augment
from .network import Network
from .network import ExportNetwork
from .metrics import compute_metrics
from .metrics import compute_class_metrics
from .manifest import Manifest

#
# Type: EpochCallback
# Since: 2.0.0
#
# Called after each epoch with the zero-based epoch index and its logs
# (loss, accuracy, precision, recall, roc_auc, pr_auc, their val_ variants
# and lr).
#

EpochCallback = Callable[[int, Dict[str, float]], None]

#
# Constants
#

EARLY_STOP_PATIENCE  = 15
EARLY_STOP_MIN_DELTA = 0.001

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

        if image_chan != 3:
            raise ValueError(f"Only RGB images are supported, got {image_chan} channel(s).")

        self.weights_path = weights_path
        self.manifest_path = manifest_path
        self.image_size = image_size
        self.image_chan = image_chan
        self.batch_size = batch_size
        self.dropout_rate = dropout_rate
        self.freeze_backbone = freeze_backbone
        self.seed = seed

        self.device = select_device()
        self.generator = torch.Generator().manual_seed(seed)

        self.manifest = Manifest(manifest_path)

        self.num_classes = len(self.manifest.labels)

        self.prepare()
        self.compile()

    #
    # Method: train
    # Since: 1.0.0
    #

    def train(self, epochs: int, callback: EpochCallback, checkpoints_path: Path) -> None:

        best_score = -math.inf
        best_state = None
        wait = 0

        for epoch in range(epochs):

            train_loss, train_prob = self.fit_epoch()
            valid_loss, valid_prob = self.evaluate(self.valid_x, self.valid_y)

            train_metrics = compute_metrics(self.train_y.numpy(), train_prob)
            valid_metrics = compute_metrics(self.valid_y.numpy(), valid_prob)

            self.scheduler.step(valid_loss)

            logs: Dict[str, float] = {"loss": train_loss, **train_metrics, "val_loss": valid_loss}

            for key, val in valid_metrics.items():
                logs[f"val_{key}"] = val

            logs["lr"] = self.optimizer.param_groups[0]["lr"]

            #
            # Early stopping on validation accuracy. The best weights are
            # checkpointed and restored when training ends.
            #

            score = valid_metrics["accuracy"]

            if score - EARLY_STOP_MIN_DELTA > best_score:
                best_score = score
                best_state = copy.deepcopy(self.network.state_dict())
                torch.save(best_state, checkpoints_path)
                wait = 0
            else:
                wait += 1

            callback(epoch, logs)

            if wait >= EARLY_STOP_PATIENCE:
                break

        if best_state is not None:
            self.network.load_state_dict(best_state)

    #
    # Method: valid
    # Since: 1.0.0
    #

    def valid(self) -> Tuple[Dict[str, float], Dict[int, Dict[str, Any]]]:

        loss, y_prob = self.evaluate(self.valid_x, self.valid_y)
        y_true = self.valid_y.numpy()

        metrics = compute_metrics(y_true, y_prob)

        precision = metrics["precision"]
        recall    = metrics["recall"]
        f1        = float("nan")

        if (precision + recall) > 0:
            f1 = float(2.0 * precision * recall / (precision + recall))

        data = {
            "loss":      round(loss,                 6),
            "accuracy":  round(metrics["accuracy"],  6),
            "precision": round(precision,            6),
            "recall":    round(recall,               6),
            "rocAuc":    round(metrics["roc_auc"],   6),
            "prAuc":     round(metrics["pr_auc"],    6),
            "f1":        round(f1,                   6),
        }

        return data, compute_class_metrics(y_true, y_prob)

    #
    # Method: export
    # Since: 1.0.0
    #
    # Exports an ONNX model taking a (1, H, W, 3) float32 image in the 0..255
    # range and returning one sigmoid probability per label. The export is
    # checked against PyTorch on validation images before it's returned.
    #

    def export(self, quantization: str, filepath: Path, filename: str) -> Path:

        import onnx

        filepath.mkdir(parents=True, exist_ok=True)

        if quantization not in ("fp32", "fp16"):
            raise ValueError(f"Unsupported quantization: {quantization}.")

        path = filepath / f"{filename}_{quantization}.onnx"

        reference = ExportNetwork(copy.deepcopy(self.network).cpu()).eval()

        # Input and output stay float32 whatever the quantization, so
        # runtimes feed the same tensor to every variant.
        network = ExportNetwork(copy.deepcopy(self.network).cpu(), half=quantization == "fp16").eval()

        sample = torch.zeros(1, self.image_size, self.image_size, self.image_chan)

        program = torch.onnx.export(
            network,
            (sample,),
            dynamo=True,
            input_names=["input"],
            output_names=["output"],
        )

        program.optimize()

        model = program.model_proto

        onnx.checker.check_model(model)
        onnx.save(model, str(path))

        self.verify(path, reference, tolerance=1e-4 if quantization == "fp32" else 2e-2)

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

        #
        # Decodes every image once, up front. Images are small after the
        # resize (150 KB at 224px) so the whole set stays in memory and
        # epochs never touch the disk.
        #

        self.train_x, self.train_y = self.dataset(train_records)
        self.valid_x, self.valid_y = self.dataset(valid_records)

        self.split_stats = {
            "total": len(records),
            "train": len(train_records),
            "valid": len(valid_records),
            "trainPerClass": count_per_class(train_records),
            "validPerClass": count_per_class(valid_records),
            "device": str(self.device),
        }

    #
    # Method: compile
    # Since: 1.0.0
    # Hidden
    #

    def compile(self) -> None:

        self.network = Network(
            weights_path=self.weights_path,
            num_classes=self.num_classes,
            dropout_rate=self.dropout_rate,
            freeze_backbone=self.freeze_backbone
        ).to(self.device)

        params = [p for p in self.network.parameters() if p.requires_grad]

        self.optimizer = torch.optim.Adam(params, lr=1e-3)

        self.scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
            self.optimizer,
            mode="min",
            factor=0.5,
            patience=5,
            cooldown=2,
            min_lr=3e-6,
        )

    #
    # Method: dataset
    # Since: 1.0.0
    # Hidden
    #

    def dataset(self, records: List[Record]) -> Tuple[torch.Tensor, torch.Tensor]:

        labels = torch.zeros((len(records), self.num_classes), dtype=torch.float32)

        for i, record in enumerate(records):
            for label in record.labels:
                labels[i, label] = 1.0

        with ThreadPoolExecutor() as pool:
            images = list(pool.map(lambda r: decode(r.image, self.image_size), records))

        return torch.stack(images), labels

    #
    # Method: fit_epoch
    # Since: 2.0.0
    # Hidden
    #

    def fit_epoch(self) -> Tuple[float, np.ndarray]:

        self.network.train()

        n = self.train_x.shape[0]

        order = torch.randperm(n, generator=self.generator)
        probs = np.zeros((n, self.num_classes), dtype=np.float32)
        total = 0.0

        for start in range(0, n, self.batch_size):

            index = order[start:start + self.batch_size]

            x = self.train_x[index].to(self.device).float()
            y = self.train_y[index].to(self.device)

            x = augment(x, self.generator)

            logits = self.network(x)
            loss = F.binary_cross_entropy_with_logits(logits, y)

            self.optimizer.zero_grad(set_to_none=True)
            loss.backward()
            self.optimizer.step()

            total += float(loss.detach()) * len(index)
            probs[index.numpy()] = torch.sigmoid(logits.detach()).cpu().numpy()

        return total / n, probs

    #
    # Method: evaluate
    # Since: 2.0.0
    # Hidden
    #

    @torch.inference_mode()
    def evaluate(self, images: torch.Tensor, labels: torch.Tensor) -> Tuple[float, np.ndarray]:

        self.network.eval()

        n = images.shape[0]

        probs: List[np.ndarray] = []
        total = 0.0

        for start in range(0, n, self.batch_size):

            x = images[start:start + self.batch_size].to(self.device).float()
            y = labels[start:start + self.batch_size].to(self.device)

            logits = self.network(x)

            total += float(F.binary_cross_entropy_with_logits(logits, y, reduction="sum")) / self.num_classes
            probs.append(torch.sigmoid(logits).cpu().numpy())

        return total / n, np.concatenate(probs, axis=0)

    #
    # Method: verify
    # Since: 2.0.0
    # Hidden
    #
    # Runs validation images through ONNX Runtime and PyTorch and fails the
    # export if they disagree. Catches layout, preprocessing and conversion
    # regressions before a model ever reaches the browser or OBS.
    #

    @torch.inference_mode()
    def verify(self, path: Path, network: ExportNetwork, tolerance: float) -> None:

        import onnxruntime as ort

        session = ort.InferenceSession(str(path), providers=["CPUExecutionProvider"])

        for image in self.valid_x[:16]:

            x = image.unsqueeze(0).float()

            expected = network(x).numpy()
            received = session.run(None, {"input": x.numpy()})[0]

            diff = float(np.max(np.abs(expected - received)))

            if diff > tolerance:
                raise RuntimeError(f"Exported model differs from PyTorch by {diff:.6f} (tolerance {tolerance}).")

# ------------------------------------------------------------------------------
# Private API
# ------------------------------------------------------------------------------

#
# Function: select_device
# Since: 2.0.0
# Hidden
#

def select_device() -> torch.device:

    if torch.cuda.is_available():
        return torch.device("cuda")

    if torch.backends.mps.is_available():
        return torch.device("mps")

    return torch.device("cpu")

#
# Function: split
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
# Returns a (H, W, 3) uint8 tensor. The resize is a plain half-pixel
# bilinear, without antialiasing, the same sampling the OBS plugin uses on
# live frames.
#

def decode(path: str, image_size: int) -> torch.Tensor:

    with Image.open(path) as image:
        array = np.asarray(image.convert("RGB"))

    x = torch.from_numpy(array.copy()).permute(2, 0, 1).unsqueeze(0).float()
    x = F.interpolate(x, size=(image_size, image_size), mode="bilinear", align_corners=False, antialias=False)

    return x.squeeze(0).permute(1, 2, 0).round().clamp(0, 255).to(torch.uint8)
