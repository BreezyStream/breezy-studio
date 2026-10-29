from task import Task
from model import Model
from model import Config

#
# Class: ValidTask
# Since: 1.0.0
#

class ValidTask(Task):

    # --------------------------------------------------------------------------
    # Methods
    # --------------------------------------------------------------------------

	#
	# Constructor
	# Since: 1.0.0
	#

	def __init__(self, model: Model) -> None:

		super().__init__(
			name="valid",
			title="Valid Model Task.",
			infos="Valid Model Task."
		)

		self.model = model

	#
	# Method: execute
	# Since: 1.0.0
	#

	def execute(self, config: Config) -> None:

		metrics, class_metrics = self.model.valid()

		data = {
			"status": "result",
			"result": {
				"metrics": metrics,
				"classMetrics": class_metrics
			}
		}

		self.emit(data)
