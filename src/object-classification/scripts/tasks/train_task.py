from task import Task
from model import Model
from model import Config

from tensorflow.keras.callbacks import Callback

#
# Class: TrainTask
# Since: 1.0.0
#

class TrainTask(Task):

    # --------------------------------------------------------------------------
    # Methods
    # --------------------------------------------------------------------------

	#
	# Constructor
	# Since: 1.0.0
	#

	def __init__(self, model: Model) -> None:

		super().__init__(
			name="train",
			title="Train Model Task.",
			infos="Train Model Task."
		)

		self.model = model

	#
	# Method: execute
	# Since: 1.0.0
	#

	def execute(self, config: Config) -> None:

		checkpoints_path = config.root_dir / "ckpt_best.keras"
		tensorboard_path = config.root_dir / "tb"

		self.epochs = config.epochs

		self.emit({
			"status": "split",
			"split": self.model.split_stats
		})

		self.model.train(
			epochs=self.epochs,
			checkpoints_path=checkpoints_path,
			tensorboard_path=tensorboard_path,
			callback=TrainCallback(self)
		)

#
# Class: TrainCallback
# Since: 1.0.0
#

class TrainCallback(Callback):

	# -------------------------------------------------------------------------
	# Methods
	# -------------------------------------------------------------------------

	def __init__(self, task: Task):
		super().__init__()
		self.task = task

	# -------------------------------------------------------------------------

	def on_epoch_end(self, epoch, logs=None):

		logs = logs or {}

		stats: Dict[str, Any] = {}

		for key, val in logs.items():

			if val is None:
				continue

			try:
				stats[key] = float(val)
			except (TypeError, ValueError):
				try:
					stats[key] = val.item()
				except Exception:
					stats[key] = str(val)

		total = self.task.epochs

		data = {
			"status": "result",
			"result": {
				"epoch": epoch + 1,
				"total": total,
				"stats": stats,
			}
		}

		self.task.emit(data)
