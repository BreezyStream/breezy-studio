from task import Task
from model import Model
from model import Config

#
# Class: ExportTask
# Since: 1.0.0
#

class ExportTask(Task):

    # --------------------------------------------------------------------------
    # Methods
    # --------------------------------------------------------------------------

    #
    # Constructor
    # Since: 1.0.0
    #

    def __init__(self, model: Model) -> None:

        super().__init__(
            name="export",
            title="Export Model Task.",
            infos="Export Model Task."
        )

        self.model = model

    #
    # Method: execute
    # Since: 1.0.0
    #

    def execute(self, config: Config) -> None:

        filename = "model"
        filepath = config.dist_dir

        path = self.model.export(
            quantization=config.quantization,
            filename=filename,
            filepath=filepath
        )

        data = {
            "status": "result",
            "result": {
                "path": str(path)
            }
        }

        self.emit(data)
