import { TensorflowPythonProcess } from 'libs/process/TensorflowPythonProcess'
import { TaskState } from 'libs/task/Task'
import { ObjectClassificationTrainingTask } from 'object-classification/lib/task/ObjectClassificationTrainingTask'
import { ObjectClassificationModelData } from 'object-classification/main.generated'
import { ObjectClassificationModelClassMetrics } from 'object-classification/types'
import { ObjectClassificationModelMetrics } from 'object-classification/types'
import { ObjectClassificationTrainingSessionConfig } from 'object-classification/types'
import { ObjectClassificationTrainingSessionStep } from 'object-classification/types'

/**
 * @class ObjectClassificationTrainTask
 * @since 1.0.0
 */
export class ObjectClassificationTrainTask extends ObjectClassificationTrainingTask {

	/**
	 * @property process
	 * @since 1.0.0
	 * @hidden
	 */
	private process: TensorflowPythonProcess | null = null

	/**
	 * @property errors
	 * @since 1.0.0
	 * @hidden
	 */
	private errors: Array<string> = []

	/**
	 * @property metrics
	 * @since 1.0.0
	 * @hidden
	 */
	private metrics: ObjectClassificationModelMetrics

	/**
	 * @property classMetrics
	 * @since 1.0.0
	 * @hidden
	 */
	private classMetrics: Dictionary<ObjectClassificationModelClassMetrics>

	/**
	 * @constructor
	 * @since 1.0.0
	 */
	public constructor(model: ObjectClassificationModelData, config: ObjectClassificationTrainingSessionConfig, metrics: ObjectClassificationModelMetrics, classMetrics: Dictionary<ObjectClassificationModelClassMetrics>) {

		super(
			model,
			config
		)

		this.metrics = metrics
		this.classMetrics = classMetrics
	}

	/**
	 * @inherited
	 * @method execute
	 * @since 1.0.0
	 */
	public async execute() {

		this.update(ObjectClassificationTrainingSessionStep.Train)

		let {
			manifestPath,
			imageSize,
			imageChan,
			batchSize,
			epochs,
			quantization
		} = this.config.train

		let dropoutRate = 0.0

		let exec = [
			'src',
			'object-classification',
			'scripts',
			'train.py'
		]

		let args = [
			'--manifest-path', manifestPath,
			'--image-size', String(imageSize),
			'--image-chan', String(imageChan),
			'--batch-size', String(batchSize),
			'--dropout-rate', String(dropoutRate),
			'--epochs', String(epochs),
			'--quantization', String(quantization),
			'--root-dir', this.config.train.rootPath,
			'--dist-dir', this.config.train.distPath
		]

		this.process = new TensorflowPythonProcess(exec, args)
		this.process.on('stdout', this.onOutMessage.bind(this))
		this.process.on('stderr', this.onErrMessage.bind(this))
		this.process.spawn()

		let code = await this.process.wait()

		if (this.state == TaskState.Running && code != 0) {
			throw new Error(this.errors.at(-1) ?? `Training process exited with code ${code}.`)
		}

		this.finish()
	}

	/**
	 * @inherited
	 * @method cancel
	 * @since 1.0.0
	 */
	public cancel() {

		if (this.process) {
			this.process.kill()
			this.process = null
		}

		return super.cancel()
	}

	//--------------------------------------------------------------------------
	// Private API
	//--------------------------------------------------------------------------

	/**
	 * @method onOutMessage
	 * @since 1.0.0
	 * @hidden
	 */
	private onOutMessage(line: string) {

		let message = this.decode(line)
		if (message == null) {
			return
		}

		let {
			task,
			data
		} = message

		if (task == 'train') {

			if (data.status == 'began' ||
				data.status == 'ended') {
				this.update(ObjectClassificationTrainingSessionStep.Train)
			}

			if (data.status == 'split') {
				console.log('[ObjectClassificationTrainTask] train/valid split:', data.split)
			}

			if (data.status == 'result') {

				let {
					epoch,
					total
				} = data.result

				this.update(ObjectClassificationTrainingSessionStep.Train, {
					progress: epoch / total,
					epoch,
					total,
				})
			}

			return
		}

		if (task == 'valid') {

			if (data.status == 'began' ||
				data.status == 'ended') {
				this.update(ObjectClassificationTrainingSessionStep.Valid)
			}

			if (data.status == 'result') {

				let metrics = data.result.metrics as ObjectClassificationModelMetrics
				if (metrics) {
					Object.assign(this.metrics, metrics)
				}

				let classMetrics = data.result.classMetrics as Dictionary<ObjectClassificationModelClassMetrics>
				if (classMetrics) {
					Object.assign(this.classMetrics, classMetrics)
				}
			}

			return
		}

		if (task == 'export') {

			if (data.status == 'began' ||
				data.status == 'ended') {
				this.update(ObjectClassificationTrainingSessionStep.Export)
			}

			return
		}
	}

	/**
	 * @method onErrMessage
	 * @since 1.0.0
	 * @hidden
	 */
	private onErrMessage(message: string) {
		this.errors.push(message)
		this.errors = this.errors.slice(-20)
	}

	/**
	 * @method onErrMessage
	 * @since 1.0.0
	 * @hidden
	 */
	private decode(message: string) {
		try {
			return JSON.parse(message)
		} catch {
			return null
		}
	}
}
