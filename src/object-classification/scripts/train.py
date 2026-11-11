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

# Ops MPS doesn't implement fall back to the CPU instead of failing.
os.environ["PYTORCH_ENABLE_MPS_FALLBACK"] = "1"

# Required by deterministic cuBLAS kernels.
os.environ["CUBLAS_WORKSPACE_CONFIG"] = ":4096:8"

import numpy as np
import torch

SCRIPT_DIR = Path(__file__).resolve().parent

SEED = 6673

random.seed(SEED)
np.random.seed(SEED)
torch.manual_seed(SEED)

# ------------------------------------------------------------------------------
# Configuration
# ------------------------------------------------------------------------------

# Same inputs, same model. Ops without a deterministic kernel only warn.
torch.use_deterministic_algorithms(True, warn_only=True)

logging.getLogger("torch.onnx").setLevel(logging.ERROR)

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

    weights_path = SCRIPT_DIR / "weights/mobilenet_v2-b0353104.pth"

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
