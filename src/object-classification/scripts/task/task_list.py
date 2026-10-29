from typing import Any
from typing import List
from task import Task
from model import Config
from model import Manifest

#
# Class: TaskList
# Since: 1.0.0
#

class TaskList:

    # --------------------------------------------------------------------------
    # Methods
    # --------------------------------------------------------------------------

    #
    # Constructor
    # Since: 1.0.0
    #

    def __init__(self, tasks: List) -> None:
        self.tasks = tasks

    #
    # Method: execute
    # Since: 1.0.0
    #

    def execute(self, config: Config) -> None:
        for task in self.tasks:
            self.task_began(task)
            task.execute(config)
            self.task_ended(task)

    # --------------------------------------------------------------------------
    # Private API
    # --------------------------------------------------------------------------

    #
    # Method: task_began
    # Since: 1.0.0
    #

    def task_began(self, task: Task) -> None:
        task.emit({ "status": "began" })

    #
    # Method: task_ended
    # Since: 1.0.0
    #

    def task_ended(self, task: Task) -> None:
        task.emit({ "status": "ended" })