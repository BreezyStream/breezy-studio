import math
import torch
import torch.nn.functional as F

#
# Constants
#
# YIQ conversion, used to rotate the hue without a round trip through HSV.
#

RGB_TO_YIQ = torch.tensor([
    [0.299,  0.587,  0.114],
    [0.596, -0.274, -0.322],
    [0.211, -0.523,  0.312],
])

YIQ_TO_RGB = torch.linalg.inv(RGB_TO_YIQ)

#
# Function: augment
# Since: 2.0.0
#
# Adds random variations to a batch so the model learns shapes rather than
# one specific palette or framing. Runs on the training device, batch-wise,
# with per-image parameters drawn from a CPU generator so a run is
# reproducible on any device. Never part of the exported model.
#
#   images: NHWC float, 0..255
#

def augment(images: torch.Tensor, generator: torch.Generator) -> torch.Tensor:

    n = images.shape[0]
    device = images.device

    def uniform(lo: float, hi: float) -> torch.Tensor:
        return (torch.rand(n, generator=generator) * (hi - lo) + lo).to(device)

    x = images.permute(0, 3, 1, 2) / 255.0

    x = jitter(x, hue=uniform(-0.05, 0.05), saturation=uniform(0.7, 1.3), brightness=uniform(-0.15, 0.15))
    x = flip(x, mask=(torch.rand(n, generator=generator) < 0.5).to(device))
    x = transform(x, angle=uniform(-0.03, 0.03) * 2 * math.pi, scale=uniform(0.9, 1.1), tx=uniform(-0.1, 0.1), ty=uniform(-0.1, 0.1))
    x = contrast(x, factor=uniform(0.8, 1.2))

    return x.clamp(0.0, 1.0).permute(0, 2, 3, 1) * 255.0

# ------------------------------------------------------------------------------
# Private API
# ------------------------------------------------------------------------------

#
# Function: jitter
# Since: 2.0.0
# Hidden
#

def jitter(x: torch.Tensor, hue: torch.Tensor, saturation: torch.Tensor, brightness: torch.Tensor) -> torch.Tensor:

    rgb_to_yiq = RGB_TO_YIQ.to(x.device)
    yiq_to_rgb = YIQ_TO_RGB.to(x.device)

    yiq = torch.einsum("ij,njhw->nihw", rgb_to_yiq, x)

    # Hue is a rotation of the I/Q plane, saturation its length.
    a = hue * 2 * math.pi
    cos = torch.cos(a).view(-1, 1, 1)
    sin = torch.sin(a).view(-1, 1, 1)
    s = saturation.view(-1, 1, 1)

    y = yiq[:, 0]
    i = yiq[:, 1]
    q = yiq[:, 2]

    yiq = torch.stack([y, (i * cos - q * sin) * s, (i * sin + q * cos) * s], dim=1)

    x = torch.einsum("ij,njhw->nihw", yiq_to_rgb, yiq)
    x = x + brightness.view(-1, 1, 1, 1)

    return x.clamp(0.0, 1.0)

#
# Function: flip
# Since: 2.0.0
# Hidden
#

def flip(x: torch.Tensor, mask: torch.Tensor) -> torch.Tensor:
    return torch.where(mask.view(-1, 1, 1, 1), x.flip(-1), x)

#
# Function: transform
# Since: 2.0.0
# Hidden
#
# Rotation, zoom and translation in a single resampling. Pixels sampled
# outside the image are reflected back, so no black borders are introduced.
#

def transform(x: torch.Tensor, angle: torch.Tensor, scale: torch.Tensor, tx: torch.Tensor, ty: torch.Tensor) -> torch.Tensor:

    cos = torch.cos(angle) * scale
    sin = torch.sin(angle) * scale

    theta = torch.stack([
        torch.stack([cos, -sin, tx], dim=1),
        torch.stack([sin,  cos, ty], dim=1),
    ], dim=1)

    grid = F.affine_grid(theta, list(x.shape), align_corners=False)

    return F.grid_sample(x, grid, mode="bilinear", padding_mode="reflection", align_corners=False)

#
# Function: contrast
# Since: 2.0.0
# Hidden
#

def contrast(x: torch.Tensor, factor: torch.Tensor) -> torch.Tensor:
    mean = x.mean(dim=(2, 3), keepdim=True)
    return (x - mean) * factor.view(-1, 1, 1, 1) + mean
