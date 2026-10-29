import { ObjectClassificationTrainingTask } from 'object-classification/lib/task/ObjectClassificationTrainingTask'
import { ObjectClassificationModelData } from 'object-classification/main.generated'
import { ObjectClassificationModelManifest } from 'object-classification/manifest/ObjectClassificationModelManifest'
import { ObjectClassificationTrainManifest } from 'object-classification/manifest/ObjectClassificationTrainManifest'
import { ObjectClassificationTrainingSessionConfig } from 'object-classification/types'
import { ObjectClassificationTrainingSessionStep } from 'object-classification/types'

/**
 * @class ObjectClassificationFinishTask
 * @since 1.0.0
 */
export class ObjectClassificationFinishTask extends ObjectClassificationTrainingTask {

	/**
	 * @property modelManifest
	 * @since 1.0.0
	 */
	public readonly modelManifest: ObjectClassificationModelManifest

	/**
	 * @property modelManifest
	 * @since 1.0.0
	 */
	public readonly trainManifest: ObjectClassificationTrainManifest

	/**
	 * @constructor
	 * @since 1.0.0
	 */
	public constructor(model: ObjectClassificationModelData, config: ObjectClassificationTrainingSessionConfig, modelManifest: ObjectClassificationModelManifest, trainManifest: ObjectClassificationTrainManifest) {

		super(
			model,
			config
		)

		this.modelManifest = modelManifest
		this.trainManifest = trainManifest
	}

	/**
	 * @inherited
	 * @method execute
	 * @since 1.0.0
	 */
	public async execute() {
		this.update(ObjectClassificationTrainingSessionStep.Cleanup)
		this.removeDir(this.config.train.rootPath)
		this.finish()
	}

	/**
	 * @inherited
	 * @method cancel
	 * @since 1.0.0
	 */
	public cancel() {
		return super.cancel()
	}
}
