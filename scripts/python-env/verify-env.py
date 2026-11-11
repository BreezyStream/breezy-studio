#
# Smoke test for a packed environment: imports what the training script uses,
# runs a training step and an ONNX export, and reports the device.
#

import os
import tempfile

os.environ["PYTORCH_ENABLE_MPS_FALLBACK"] = "1"

import numpy as np
import torch
import torchvision
import onnx
import onnxruntime as ort
from PIL import Image

device = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"

print("torch", torch.__version__, "torchvision", torchvision.__version__, "onnxruntime", ort.__version__)
print("device", device, torch.cuda.get_device_name(0) if device == "cuda" else "")

model = torchvision.models.mobilenet_v2(weights=None, num_classes=2).to(device)
optimizer = torch.optim.Adam(model.parameters())

x = torch.rand(8, 3, 64, 64, device=device)
y = torch.randint(0, 2, (8, 2), device=device).float()

loss = torch.nn.functional.binary_cross_entropy_with_logits(model(x), y)
loss.backward()
optimizer.step()

model = model.cpu().eval()

with tempfile.TemporaryDirectory() as dir:
    path = os.path.join(dir, "model.onnx")
    onnx.save(torch.onnx.export(model, (torch.rand(1, 3, 64, 64),), dynamo=True).model_proto, path)
    session = ort.InferenceSession(path, providers=["CPUExecutionProvider"])
    session.run(None, {session.get_inputs()[0].name: np.random.rand(1, 3, 64, 64).astype(np.float32)})

print("ok")
