import { EventEmitter } from 'events'
import { Task } from 'libs/task/Task'
import { TaskState } from 'libs/task/Task'

/**
 * @class TaskList
 * @since 1.0.0
 */
export class TaskList extends EventEmitter {

	/**
	 * @property tasks
	 * @since 1.0.0
	 */
	public tasks: Array<Task>

	/**
	 * @property state
	 * @since 1.0.0
	 */
	public state: TaskState

	/**
	 * @property error
	 * @since 1.0.0
	 */
	public error: unknown = null

	/**
	 * @property task
	 * @since 1.0.0
	 * @hidden
	 */
	private task: Task | null = null

	/**
	 * @constructor
	 * @since 1.0.0
	 */
	public constructor(tasks: Array<Task>) {
		super()
		this.tasks = tasks
		this.state = TaskState.Idle
	}

	/**
	 * @method execute
	 * @since 1.0.0
	 */
	public async execute() {

		if (this.state != TaskState.Idle) {
			return
		}

		this.state = TaskState.Running

		for (let task of this.tasks) {

			if (this.state != TaskState.Running) {
				break
			}

			/**
			 * @function onUpdate
			 * @since 1.0.0
			 * @hidden
			 */
			const onUpdate = (step: string, data: any) => {
				this.emit('update', step, data)
			}

			this.task = task
			this.task.on('update', onUpdate)
			this.task.perform()

			await this.task.waitDone()

			this.task.off('update', onUpdate)

			if (this.task.state == TaskState.Failed) {
				this.fail(this.task.error)
				break
			}

			await this.task.waitTime(500)
		}

		this.task = null

		if (this.state == TaskState.Running) {
			this.state = TaskState.Finished
			this.emit('finish')
		}
	}

	/**
	 * @method cancel
	 * @since 1.0.0
	 */
	public cancel() {

		if (this.state == TaskState.Running) {
			this.state = TaskState.Canceled
			this.task?.cancel()
			this.emit('cancel')
		}

		return this
	}

	//--------------------------------------------------------------------------
	// Private API
	//--------------------------------------------------------------------------

	/**
	 * @method fail
	 * @since 1.0.0
	 * @hidden
	 */
	private fail(error: unknown) {

		if (this.state == TaskState.Running) {
			this.state = TaskState.Failed
			this.error = error
			this.emit('fail', error)
		}

		return this
	}
}
