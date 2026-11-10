import fs from 'fs'
import path from 'path'
import { createApolloClient } from 'libs/apollo'
import { gql } from 'libs/apollo'
import { MyObjectClassificationModelFileType } from 'graphql/schema.generated'
import { UnexpectedError } from 'libs/error/UnexpectedError'
import { UploadFile } from 'libs/file/UploadFile'
import { ObjectClassificationTrainingTask } from 'object-classification/lib/task/ObjectClassificationTrainingTask'
import { CreateMyObjectClassificationModelTraining } from 'object-classification/main.generated'
import { ObjectClassificationModelData } from 'object-classification/main.generated'
import { ObjectClassificationModelClass } from 'object-classification/types'
import { ObjectClassificationModelClassMetrics } from 'object-classification/types'
import { ObjectClassificationModelMetrics } from 'object-classification/types'
import { ObjectClassificationTrainingSessionConfig } from 'object-classification/types'
import { ObjectClassificationTrainingSessionStep } from 'object-classification/types'

/**
 * @class ObjectClassificationUploadTask
 * @since 1.0.0
 */
export class ObjectClassificationUploadTask extends ObjectClassificationTrainingTask {

	/**
	 * @property metrics
	 * @since 1.0.0
	 * @hidden
	 */
	private metrics: ObjectClassificationModelMetrics

	/**
	 * @property classes
	 * @since 1.0.0
	 * @hidden
	 */
	private classes: Array<ObjectClassificationModelClass>

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
	public constructor(model: ObjectClassificationModelData, config: ObjectClassificationTrainingSessionConfig, metrics: ObjectClassificationModelMetrics, classes: Array<ObjectClassificationModelClass>, classMetrics: Dictionary<ObjectClassificationModelClassMetrics>) {

		super(
			model,
			config
		)

		this.metrics = metrics
		this.classes = classes
		this.classMetrics = classMetrics
	}

	/**
	 * @method execute
	 * @since 1.0.0
	 */
	public async execute() {

		let client = await createApolloClient({
			onProgress: (progress: number) => {
				this.update(ObjectClassificationTrainingSessionStep.Upload, { progress })
			}
		})

		let {
			id: modelId
		} = this.model

		let files = await Promise.all(this.getModelFiles().map(async entry => {

			let type: MyObjectClassificationModelFileType

			let {
				filename,
				filepath,
				mimetype
			} = entry

			switch (true) {

				case filename.endsWith('fp32.tflite'):
					type = MyObjectClassificationModelFileType.TensorflowLiteFp32Model
					break

				case filename.endsWith('fp16.tflite'):
					type = MyObjectClassificationModelFileType.TensorflowLiteFp16Model
					break

				case filename.endsWith('int8.tflite'):
					type = MyObjectClassificationModelFileType.TensorflowLiteInt8Model
					break

				case filename.endsWith('.json'):
					type = MyObjectClassificationModelFileType.TensorflowJsModel
					break

				case filename.endsWith('.bin'):
					type = MyObjectClassificationModelFileType.TensorflowJsShard
					break

				default:
					throw new UnexpectedError()
			}

			return {
				type,
				file: await UploadFile.from(
					filename,
					filepath,
					mimetype
				)
			}

		}))

		let metrics = this.metrics

		let labels = this.classes.map(entry => {

			let {
				id: labelId,
				index
			} = entry

			let classMetrics = this.classMetrics[String(index)] ?? { support: 0 }

			return {
				objectClassificationModelLabelId: labelId,
				metrics: classMetrics
			}
		})

		let file = files[0]

		let input = {
			file,
			metrics,
			labels,
			objectClassificationModelId: modelId
		}

		await client.mutate({
			mutation: CreateMyObjectClassificationModelTraining,
			variables: {
				input
			}
		})

		this.finish()
	}

	//--------------------------------------------------------------------------
	// Private API
	//--------------------------------------------------------------------------

	/**
	 * @function getModelFiles
	 * @since 1.0.0
	 * @hidden
	 */
	private getModelFiles() {

		let {
			distPath: root
		} = this.config.train

		let files = fs.readdirSync(root).filter(file =>
			path.extname(file) == '.tflite'
		).map(file => {

			let filename = file
			let filepath = path.join(root, file)
			let mimetype = ''

			let ext = path.extname(filename)

			switch (ext) {

				case '.json':
					mimetype = 'application/json'
					break

				default:
					mimetype = 'application/octet-stream'
					break
			}

			return {
				filename,
				filepath,
				mimetype
			}

		})

		return files
	}
}
