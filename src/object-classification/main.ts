import path from 'path'
import { randomUUID } from 'crypto'
import { app } from 'electron'
import { BrowserWindow } from 'electron'
import { IpcMainInvokeEvent } from 'electron'
import { ObjectClassificationFinishTask } from './task/ObjectClassificationFinishTask'
import { ObjectClassificationPrepareTask } from './task/ObjectClassificationPrepareTask'
import { MyObjectClassificationModelTrainingMetrics } from 'graphql/schema.generated'
import { Bridge } from 'libs/bridge/Bridge'
import { UnexpectedError } from 'libs/error/UnexpectedError'
import { TaskList } from 'libs/task/TaskList'
import { ObjectClassificationModelData } from 'object-classification/main.generated'
import { ObjectClassificationModelManifest } from 'object-classification/manifest/ObjectClassificationModelManifest'
import { ObjectClassificationTrainManifest } from 'object-classification/manifest/ObjectClassificationTrainManifest'
import { ObjectClassificationTrainTask } from 'object-classification/task/ObjectClassificationTrainTask'
import { ObjectClassificationUploadTask } from 'object-classification/task/ObjectClassificationUploadTask'
import { ObjectClassificationModelClass } from 'object-classification/types'
import { ObjectClassificationModelClassMetrics } from 'object-classification/types'
import { ObjectClassificationTrainingSession } from 'object-classification/types'
import { ObjectClassificationTrainingSessionConfig } from 'object-classification/types'
import { ObjectClassificationTrainingSessionData } from 'object-classification/types'
import { ObjectClassificationTrainingSessionOptions } from 'object-classification/types'
import { ObjectClassificationTrainingSessionStep } from 'object-classification/types'

/**
 * @class ObjectClassificationModelTrainer
 * @since 1.0.0
 */
export class ObjectClassificationModelTrainer extends Bridge {

	//--------------------------------------------------------------------------
	// Properties
	//--------------------------------------------------------------------------

	/**
	 * @property session
	 * @since 1.0.0
	 * @hidden
	 */
	private session: ObjectClassificationTrainingSession | null = null

	//--------------------------------------------------------------------------
	// Methods
	//--------------------------------------------------------------------------

	/**
	 * @constructor
	 * @since 1.0.0
	 */
	public constructor(window: BrowserWindow) {
		super(window)
		this.handle('ObjectClassificationModelTrainer.getSession', this.getSession.bind(this))
		this.handle('ObjectClassificationModelTrainer.createSession', this.createSession.bind(this))
		this.handle('ObjectClassificationModelTrainer.cancelSession', this.cancelSession.bind(this))
	}

	/**
	 * @method getSession
	 * @since 1.0.0
	 */
	public getSession(event: IpcMainInvokeEvent) {
		return this.session
	}

	/**
	 * @method createSession
	 * @since 1.0.0
	 */
	public async createSession(event: IpcMainInvokeEvent, model: ObjectClassificationModelData, options: ObjectClassificationTrainingSessionOptions) {

		if (this.session) {
			return null
		}

		let session: ObjectClassificationTrainingSession = {
			id: uuid(),
			step: ObjectClassificationTrainingSessionStep.Starting,
			data: {}
		}

		this.session = session

		this.train(model, options)

		return session
	}

	/**
	 * @method cancelSession
	 * @since 1.0.0
	 */
	public async cancelSession(event: IpcMainInvokeEvent, session: ObjectClassificationTrainingSession) {

	}

	//--------------------------------------------------------------------------
	// Private API
	//--------------------------------------------------------------------------

	/**
	 * @function update
	 * @since 1.0.0
	 * @hidden
	 */
	private update() {
		if (this.session) this.send('ObjectClassificationModelTrainer.update', this.session)
	}

	/**
	 * @function finish
	 * @since 1.0.0
	 * @hidden
	 */
	private finish() {
		if (this.session) this.send('ObjectClassificationModelTrainer.finish', this.session)
	}

	/**
	 * @function train
	 * @since 1.0.0
	 * @hidden
	 */
	private async train(model: ObjectClassificationModelData, options: ObjectClassificationTrainingSessionOptions) {

		let session = this.session
		if (session == null) {
			throw new UnexpectedError()
		}

		let metrics: MyObjectClassificationModelTrainingMetrics = {
			loss: 0,
			accuracy: 0,
			precision: 0,
			recall: 0,
			rocAuc: 0,
			prAuc: 0,
			f1: 0,
		}

		let classes: Array<ObjectClassificationModelClass> = []
		let classMetrics: Dictionary<ObjectClassificationModelClassMetrics> = {}

		let config = this.configure(
			model,
			options
		)

		let modelManifest = new ObjectClassificationModelManifest(config.model.manifestPath)
		let trainManifest = new ObjectClassificationTrainManifest(config.train.manifestPath)

		let tasks = new TaskList([

			new ObjectClassificationPrepareTask(
				model,
				config,
				modelManifest,
				trainManifest,
				classes
			),

			new ObjectClassificationTrainTask(
				model,
				config,
				metrics,
				classMetrics
			),

			new ObjectClassificationUploadTask(
				model,
				config,
				metrics,
				classes,
				classMetrics
			),

			new ObjectClassificationFinishTask(
				model,
				config,
				modelManifest,
				trainManifest
			)

		])

		tasks.on('update', (step: ObjectClassificationTrainingSessionStep, data: ObjectClassificationTrainingSessionData) => {
			session.step = step
			session.data = data
			this.update()
		})

		tasks.on('error', (error: unknown) => {
			this.send('ObjectClassificationModelTrainer.error', this.session, JSON.stringify(error))
		})

		try {

			await tasks.execute()

		} catch (e) {

			console.error('Error:', e)

		} finally {

			this.finish()
			this.session = null

		}
	}

	/**
	 * @function configure
	 * @since 1.0.0
	 * @hidden
	 */
	private configure(model: ObjectClassificationModelData, options: ObjectClassificationTrainingSessionOptions) {

		let root = this.getRootPath()
		let data = this.getDataPath()

		let {
			imageSize,
			imageChan,
			batchSize,
			dropoutRate,
			epochs,
			quantization,
			includeSuggested
		} = options

		let modelRootPath = path.join(data, 'Models')
		let trainRootPath = path.join(data, 'Models-Training')
		let manifestFileName = 'manifest.json'

		let config: ObjectClassificationTrainingSessionConfig = {

			model: {
				rootPath: path.join(modelRootPath, model.id),
				dataPath: path.join(modelRootPath, model.id, 'data'),
				manifestPath: path.join(modelRootPath, model.id, manifestFileName)
			},

			train: {

				imageSize,
				imageChan,
				batchSize,
				dropoutRate,
				epochs,
				quantization,
				includeSuggested,

				rootPath: path.join(trainRootPath, model.id),
				distPath: path.join(trainRootPath, model.id, 'dist'),
				manifestPath: path.join(trainRootPath, model.id, manifestFileName),
			}
		}

		return config
	}

	/**
	 * @function getRootPath
	 * @since 1.0.0
	 * @hidden
	 */
	private getRootPath() {
		return process.env.root
	}

	/**
	 * @function getDataPath
	 * @since 1.0.0
	 * @hidden
	 */
	private getDataPath() {
		return app.getPath('userData')
	}
}

/**
 * @function uuid
 * @since 1.0.0
 * @hidden
 */
function uuid() {
	return randomUUID().replace('-', '')
}
