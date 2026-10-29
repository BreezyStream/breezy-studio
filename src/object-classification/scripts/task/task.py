import sys
import time
import json
from typing import Any
from model import Config

#
# Class: Task
# Since: 1.0.0
#

class Task:

    # --------------------------------------------------------------------------
    # Methods
    # --------------------------------------------------------------------------

	#
	# Constructor
	# Since: 1.0.0
	#

	def __init__(self, name: str, title: str, infos: str) -> None:
		self.name = name
		self.title = title
		self.infos = infos

	#
	# Method: execute
	# Since: 1.0.0
	#

	def execute(self, config: Config) -> None:
		pass

    #
    # Method: emit
    # Since: 1.0.0
    #

	def emit(self, data: Any) -> None:

		name = self.name

		emit = {
			"task": name,
			"data": data,
			"time": time.time()
		}

		emit = json.dumps(emit)

		print(emit, file=sys.stdout, flush=True)