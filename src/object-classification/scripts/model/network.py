import torch
from torch import nn
from pathlib import Path
from torchvision.models import mobilenet_v2

#
# Constants
#
# ImageNet statistics the torchvision MobileNetV2 weights were trained with.
#

MEAN = (0.485, 0.456, 0.406)
STD  = (0.229, 0.224, 0.225)

#
# Class: Network
# Since: 2.0.0
#
# MobileNetV2 feature extractor with a multi-label head. Takes NHWC float
# images in the 0..255 range and returns one logit per label. Normalization
# happens inside the graph so every runtime (browser, OBS) only has to resize
# the frame into the input tensor.
#

class Network(nn.Module):

    # --------------------------------------------------------------------------
    # Methods
    # --------------------------------------------------------------------------

    #
    # Constructor
    # Since: 2.0.0
    #

    def __init__(
        self,
        weights_path: Path,
        num_classes: int,
        dropout_rate: float,
        freeze_backbone: bool
    ) -> None:

        super().__init__()

        backbone = mobilenet_v2(weights=None)
        backbone.load_state_dict(torch.load(weights_path, map_location="cpu", weights_only=True))

        #
        # Keeps the feature extractor only, the ImageNet classifier is
        # replaced by our own head.
        #

        self.features = backbone.features
        self.freeze_backbone = freeze_backbone

        #
        # Freezes the backbone.
        # Prevents the model from updating its weights during training
        # because we're using a small dataset.
        #

        if freeze_backbone:
            for param in self.features.parameters():
                param.requires_grad = False

        self.dropout = nn.Dropout(dropout_rate)
        self.head = nn.Linear(backbone.last_channel, num_classes)

        self.register_buffer("mean", torch.tensor(MEAN).view(1, 3, 1, 1) * 255.0)
        self.register_buffer("std",  torch.tensor(STD ).view(1, 3, 1, 1) * 255.0)

    #
    # Method: train
    # Since: 2.0.0
    #

    def train(self, mode: bool = True) -> "Network":

        super().train(mode)

        #
        # Keeps the frozen backbone in inference mode so its batch norm
        # statistics never drift. This is critical on tiny datasets.
        #

        if self.freeze_backbone:
            self.features.eval()

        return self

    #
    # Method: forward
    # Since: 2.0.0
    #

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = x.permute(0, 3, 1, 2)
        x = (x - self.mean) / self.std
        x = self.features(x)
        x = x.mean(dim=(2, 3))
        x = self.dropout(x)
        return self.head(x)

#
# Class: ExportNetwork
# Since: 2.0.0
#
# Wraps the network for export. Each output is an independent per-label
# probability, since an image can carry more than one label at once. With
# half, the weights and compute are float16 but the input and output stay
# float32.
#

class ExportNetwork(nn.Module):

    def __init__(self, network: Network, half: bool = False) -> None:
        super().__init__()
        self.network = network.half() if half else network
        self.half = half

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = x.half() if self.half else x
        return torch.sigmoid(self.network(x)).float()
