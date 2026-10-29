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

		for (let task of this.tasks) {

			/**
			 * @function onUpdate
			 * @since 1.0.0
			 * @hidden
			 */
			const onUpdate = (step: string, data: any) => {
				this.emit('update', step, data)
			}

			/**
			 * @function onFinish
			 * @since 1.0.0
			 * @hidden
			 */
			const onFinish = () => {
				this.finish()
			}

			/**
			 * @function onError
			 * @since 1.0.0
			 * @hidden
			 */
			const onError = (error: unknown) => {
				this.emit('error', error)
			}

			this.task = task
			this.task.on('update', onUpdate)
			this.task.on('finish', onFinish)
			this.task.on('error', onError)
			this.task.perform()

			await this.task.waitDone()
			await this.task.waitTime(500)

			if (this.state == TaskState.Canceled ||
				this.state == TaskState.Finished) {
				break
			}
		}
	}

	/**
	 * @method finish
	 * @since 1.0.0
	 */
	public finish() {

		if (this.task == null) {
			return
		}

		if (this.state == TaskState.Running) {
			this.state = TaskState.Finished
			this.finishTasks()
		}

		return this
	}

	/**
	 * @method cancel
	 * @since 1.0.0
	 */
	public cancel() {

		if (this.task == null) {
			return
		}

		if (this.state == TaskState.Running) {
			this.state = TaskState.Canceled
			this.cancelTasks()
		}

		return this
	}

	//--------------------------------------------------------------------------
	// Private API
	//--------------------------------------------------------------------------

	/**
	 * @method finishTasks
	 * @since 1.0.0
	 * @hidden
	 */
	private finishTasks() {
		this.tasks.forEach(task => task.finish())
	}

	/**
	 * @method cancelTasks
	 * @since 1.0.0
	 * @hidden
	 */
	private cancelTasks() {
		this.tasks.forEach(task => task.cancel())
	}
}