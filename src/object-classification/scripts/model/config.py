from pathlib import Path
from argparse import Namespace
from dataclasses import dataclass

#
# Class: Config
# Since: 1.0.0
#

@dataclass
class Config:

    # --------------------------------------------------------------------------
    # Methods
    # --------------------------------------------------------------------------

    #
    # Constructor
    # Since: 1.0.0
    #

    def __init__(self, args: Namespace):
        self.manifest_path = Path(args.manifest_path)
        self.image_size = args.image_size
        self.image_chan = args.image_chan
        self.batch_size = args.batch_size
        self.dropout_rate = args.dropout_rate
        self.epochs = args.epochs
        self.quantization = args.quantization
        self.root_dir = Path(args.root_dir)
        self.dist_dir = Path(args.dist_dir)
