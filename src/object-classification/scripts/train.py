import os
import random
import logging
import argparse
from pathlib import Path
from model import Model
from model import Config
from task import TaskList
from tasks import TrainTask
from tasks import ValidTask
from tasks import ExportTask

#-------------------------------------------------------------------------------
# Environment
#-------------------------------------------------------------------------------

os.environ["TF_DISABLE_JIT"] = "1"
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

import numpy as np
import tensorflow as tf

SCRIPT_DIR = Path(__file__).resolve().parent

SEED = 6673

random.seed(SEED)
np.random.seed(SEED)
tf.random.set_seed(SEED)

# ------------------------------------------------------------------------------
# Configuration
# ------------------------------------------------------------------------------

try:
    tf.config.experimental.enable_op_determinism(True)
except Exception:
    pass

try:
    tf.config.optimizer.set_jit(False)
except Exception:
    pass

tf.get_logger().setLevel(logging.ERROR)

# ------------------------------------------------------------------------------
# Main
# ------------------------------------------------------------------------------

def main() -> None:

    parser = argparse.ArgumentParser(description="Train Object Classification Model from manifest.")
    parser.add_argument("--manifest-path", type=str,   required=True)
    parser.add_argument("--image-size",    type=int,   required=True)
    parser.add_argument("--image-chan",    type=int,   required=True)
    parser.add_argument("--batch-size",    type=int,   required=True)
    parser.add_argument("--epochs",        type=int,   required=True)
    parser.add_argument("--dropout-rate",  type=float, required=True)
    parser.add_argument("--quantization",  type=str,   required=True)
    parser.add_argument("--root-dir",      type=str,   required=True)
    parser.add_argument("--dist-dir",      type=str,   required=True)

    args = parser.parse_args()

    config = Config(args)
    config.root_dir.mkdir(parents=True, exist_ok=True)
    config.dist_dir.mkdir(parents=True, exist_ok=True)

    weights_path = SCRIPT_DIR / "weights/mobilenet_v2_weights_tf_dim_ordering_tf_kernels_1.0_224_no_top.h5"

    model = Model(
        weights_path=weights_path,
        manifest_path=config.manifest_path,
        image_size=config.image_size,
        image_chan=config.image_chan,
        batch_size=config.batch_size,
        dropout_rate=config.dropout_rate,
        freeze_backbone=True,
        seed=SEED
    )

    tasks = TaskList([
        TrainTask(model=model),
        ValidTask(model=model),
        ExportTask(model=model)
    ])

    tasks.execute(config)

if __name__ == "__main__":
    main()
