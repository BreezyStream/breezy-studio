import { EventEmitter } from 'events'

/**
 * @class Task
 * @since 1.0.0
 */
export class Task extends EventEmitter {

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
	 * @constructor
	 * @since 1.0.0
	 */
	public constructor() {
		super()
		this.state = TaskState.Idle
	}

	/**
	 * @method perform
	 * @since 1.0.0
	 */
	public perform() {

		if (this.state == TaskState.Idle) {
			this.state = TaskState.Running
			this.run()
		}

		return this
	}

	/**
	 * @method execute
	 * @since 1.0.0
	 */
	public async execute() {

	}

	/**
	 * @method finish
	 * @since 1.0.0
	 */
	public finish() {

		if (this.state == TaskState.Running) {
			this.state = TaskState.Finished
			this.emit('finish')
		}

		return this
	}

	/**
	 * @method cancel
	 * @since 1.0.0
	 */
	public cancel() {

		if (this.state == TaskState.Running) {
			this.state = TaskState.Canceled
			this.emit('cancel')
		}

		return this
	}

	/**
	 * @method fail
	 * @since 1.0.0
	 */
	public fail(error: unknown) {

		if (this.state == TaskState.Running) {
			this.state = TaskState.Failed
			this.error = error
			this.emit('fail', error)
		}

		return this
	}

	/**
	 * @method waitDone
	 * @since 1.0.0
	 */
	public async waitDone() {

		let promise = new Promise<void>(done => {

			if (this.state == TaskState.Canceled ||
				this.state == TaskState.Finished ||
				this.state == TaskState.Failed) {
				done()
				return
			}

			this.once('cancel', done)
			this.once('finish', done)
			this.once('fail', done)

		})

		return promise
	}

	/**
	 * @method waitTime
	 * @since 1.0.0
	 */
	public async waitTime(time: number) {

		let promise = new Promise<void>(done => {
			setTimeout(done, time)
		})

		return promise
	}

	//--------------------------------------------------------------------------
	// Protected API
	//--------------------------------------------------------------------------

	/**
	 * @method update
	 * @since 1.0.0
	 */
	protected update(step: string, data: any = {}) {
		this.emit('update', step, data)
	}

	//--------------------------------------------------------------------------
	// Private API
	//--------------------------------------------------------------------------

	/**
	 * @method run
	 * @since 1.0.0
	 * @hidden
	 */
	private async run() {
		try {
			await this.execute()
		} catch (error) {
			this.fail(error)
		}
	}
}

/**
 * @class TaskState
 * @since 1.0.0
 */
export enum TaskState {
	Idle,
	Running,
	Canceled,
	Finished,
	Failed
}
