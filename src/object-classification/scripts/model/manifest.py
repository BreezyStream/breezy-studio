import json
from pathlib import Path
from typing import Any
from typing import Dict

#
# Class: Manifest
# Since: 1.0.0
#

class Manifest:

    # --------------------------------------------------------------------------
    # Methods
    # --------------------------------------------------------------------------

    #
    # Constructor
    # Since: 1.0.0
    #

    def __init__(self, path: Path):
        manifest = self.load(path)
        self.labels = manifest["labels"]
        self.images = manifest["images"]

    # --------------------------------------------------------------------------
    # Private API
    # --------------------------------------------------------------------------

    #
    # Method: load
    # Since: 1.0.0
    # Hidden
    #

    def load(self, path: Path) -> Dict[str, Any]:
        with open(path, "r") as f:
            return json.load(f)
