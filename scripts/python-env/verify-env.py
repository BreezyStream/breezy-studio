#
# Smoke test for a packed environment: imports what the training script uses,
# runs a training step and a TFLite export, and reports the GPU.
#

import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

import h5py
import numpy as np
import tensorflow as tf
from tensorflow import keras

print("tensorflow", tf.__version__)
print("gpus", tf.config.list_physical_devices("GPU"))

model = keras.Sequential([
    keras.layers.Input((64, 64, 3)),
    keras.layers.Conv2D(8, 3, activation="relu"),
    keras.layers.GlobalAveragePooling2D(),
    keras.layers.Dense(2, activation="sigmoid"),
])

model.compile(optimizer=keras.optimizers.legacy.Adam(), loss="binary_crossentropy")
model.fit(np.random.rand(8, 64, 64, 3), np.random.randint(0, 2, (8, 2)), epochs=1, verbose=0)

converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.target_spec.supported_types = [tf.float16]
converter.convert()

print("ok")
