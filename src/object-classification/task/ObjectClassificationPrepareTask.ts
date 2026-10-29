import fs from 'fs'
import path from 'path'
import { createApolloClient } from 'libs/apollo'
import { MyObjectClassificationModelAnnotationStatus } from 'graphql/schema.generated'
import { ApolloClient } from 'libs/apollo'
import { TaskState } from 'libs/task/Task'
import { ObjectClassificationTrainingTask } from 'object-classification/lib/task/ObjectClassificationTrainingTask'
import { MyObjectClassificationModelImageCollectionQuery } from 'object-classification/main.generated'
import { MyObjectClassificationModelLabelCollectionQuery } from 'object-classification/main.generated'
import { ObjectClassificationModelData } from 'object-classification/main.generated'
import { ObjectClassificationModelAnnotationData } from 'object-classification/main.generated'
import { ObjectClassificationModelImageData } from 'object-classification/main.generated'
import { ObjectClassificationModelLabelData } from 'object-classification/main.generated'
import { ObjectClassificationModelManifest } from 'object-classification/manifest/ObjectClassificationModelManifest'
import { ObjectClassificationModelManifestImageData } from 'object-classification/manifest/ObjectClassificationModelManifest'
import { ObjectClassificationTrainManifest } from 'object-classification/manifest/ObjectClassificationTrainManifest'
import { ObjectClassificationTrainManifestImageData } from 'object-classification/manifest/ObjectClassificationTrainManifest'
import { ObjectClassificationTrainManifestLabelData } from 'object-classification/manifest/ObjectClassificationTrainManifest'
import { ObjectClassificationModelClass } from 'object-classification/types'
import { ObjectClassificationTrainingSessionConfig } from 'object-classification/types'
import { ObjectClassificationTrainingSessionStep } from 'object-classification/types'

/**
 * @class ObjectClassificationPrepareTask
 * @since 1.0.0
 */
export class ObjectClassificationPrepareTask extends ObjectClassificationTrainingTask {

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
	 * @property labels
	 * @since 1.0.0
	 */
	private labels: Array<ObjectClassificationModelLabelData> = []

	/**
	 * @property images
	 * @since 1.0.0
	 */
	private images: Array<ObjectClassificationModelImageData> = []

	/**
	 * @property classes
	 * @since 1.0.0
	 * @hidden
	 */
	private classes: Array<ObjectClassificationModelClass>

	/**
	 * @constructor
	 * @since 1.0.0
	 */
	public constructor(model: ObjectClassificationModelData, config: ObjectClassificationTrainingSessionConfig, modelManifest: ObjectClassificationModelManifest, trainManifest: ObjectClassificationTrainManifest, classes: Array<ObjectClassificationModelClass>) {

		super(
			model,
			config
		)

		this.modelManifest = modelManifest
		this.trainManifest = trainManifest
		this.classes = classes
	}

	/**
	 * @method execute
	 * @since 1.0.0
	 */
	public async execute() {
		await this.prepareModel()
		await this.prepareTrain()
		this.finish()
	}

	//--------------------------------------------------------------------------
	// Private API
	//--------------------------------------------------------------------------

	/**
	 * @method prepareModel
	 * @since 1.0.0
	 * @hidden
	 */
	private async prepareModel() {

		this.update(ObjectClassificationTrainingSessionStep.PrepareModel)

		let client = await createApolloClient()

		this.labels = await this.loadLabels(client)
		this.images = await this.loadImages(client)

		let count = this.getImportedImageCount()
		let total = this.getImportedImageTotal()

		let images: Array<ObjectClassificationModelManifestImageData> = []

		let {
			rootPath: root,
			dataPath: dest
		} = this.config.model

		this.createDir(root)
		this.createDir(dest)

		for (let image of this.images) {

			if (this.state == TaskState.Canceled) {
				break
			}

			let {
				id,
				url,
				size,
				filename,
				filesize,
				createdAt,
				updatedAt
			} = image

			let dirty = false

			let entry = this.getManifestImage(image)
			if (entry == null) {

				dirty = true

			} else {

				if (entry.createdAt != createdAt ||
					entry.updatedAt != updatedAt ||
					fs.existsSync(entry.filepath) == false) {
					dirty = true
				}

			}

			if (dirty) {

				let data = await this.read(url)
				if (data == null) {
					continue
				}

				let filepath = path.join(
					dest,
					filename
				)

				this.save(filepath, data)

				images.push({
					id,
					size,
					filename,
					filesize,
					filepath,
					createdAt,
					updatedAt
				})

			} else {

				if (entry) {
					images.push(entry)
				}

			}

			count++

			let data = {
				count,
				total,
				progress: (count / total)
			}

			this.update(ObjectClassificationTrainingSessionStep.PrepareTrain, data)
		}

		this.modelManifest.data.images = images
		this.modelManifest.save()
	}

	/**
	 * @method prepareTrain
	 * @since 1.0.0
	 * @hidden
	 */
	private async prepareTrain() {

		this.update(ObjectClassificationTrainingSessionStep.PrepareTrain)

		let {
			rootPath,
			distPath,
		} = this.config.train

		this.removeDir(rootPath)
		this.createDir(rootPath)
		this.createDir(distPath)

		let trainLabels = this.getTrainLabels()
		let trainImages = this.getTrainImages()

		let labels = trainLabels.reduce((acc, val, idx) => ({ ...acc, [val.id]: idx }), {} as Dictionary<number>)
		let images = trainImages.reduce((acc, val, idx) => ({ ...acc, [val.id]: idx }), {} as Dictionary<number>)

		this.trainManifest.data.config = this.config.train
		this.trainManifest.data.labels = this.getTrainLabelsMap(trainLabels, labels)
		this.trainManifest.data.images = this.getTrainImagesMap(trainImages, images, labels)

		for (let label of trainLabels) {

			let index = labels[label.id]

			this.classes.push({
				id: label.id,
				name: label.name,
				label: label.title,
				color: label.color,
				index: index
			})
		}

		this.trainManifest.save()
	}

	/**
	 * @function loadLabels
	 * @since 1.0.0
	 * @hidden
	 */
	private async loadLabels(client: ApolloClient) {

		let {
			id: modelId
		} = this.model

		let array: Array<ObjectClassificationModelLabelData> = []
		let limit: number = 24
		let after: number = 0

		while (true) {

			let result = await client.query({
				query: MyObjectClassificationModelLabelCollectionQuery,
				variables: {
					input: {
						objectClassificationModelId: modelId,
						limit,
						after,
					}
				}
			})

			let data = result.data?.myObjectClassificationModelLabelCollection
			if (data == null) {
				break
			}

			let {
				items,
				total
			} = data

			array.push(...items)

			after += limit

			if (after > total) {
				break
			}
		}

		return array
	}

	/**
	 * @function loadImages
	 * @since 1.0.0
	 * @hidden
	 */
	private async loadImages(client: ApolloClient) {

		let {
			id: modelId
		} = this.model

		let array: Array<ObjectClassificationModelImageData> = []
		let limit: number = 48
		let after: number = 0

		while (true) {

			let result = await client.query({
				query: MyObjectClassificationModelImageCollectionQuery,
				variables: {
					input: {
						limit,
						after,
						objectClassificationModelId: modelId
					}
				}
			})

			let data = result.data?.myObjectClassificationModelImageCollection
			if (data == null) {
				break
			}

			let {
				items,
				total
			} = data

			array.push(...items.filter(entry => entry.annotationCount > 0))

			after += limit

			if (after > total) {
				break
			}
		}

		return array
	}

	/**
	 * @method getImportedImageCount
	 * @since 1.0.0
	 * @hidden
	 */
	private getImportedImageCount() {
		return 0
	}

	/**
	 * @method getImportedImageTotal
	 * @since 1.0.0
	 * @hidden
	 */
	private getImportedImageTotal() {
		return this.modelManifest.data.images.length
	}

	/**
	 * @method getManifestImage
	 * @since 1.0.0
	 * @hidden
	 */
	private getManifestImage(image: ObjectClassificationModelImageData) {
		return this.modelManifest.data.images.find(entry => entry.id == image.id)
	}

	/**
	 * @method getTrainLabels
	 * @since 1.0.0
	 * @hidden
	 */
	private getTrainLabels() {

		let labels = new Set<ID>()

		for (let image of this.images) {
			for (let entry of image.annotations) {
				if (this.isTrainableStatus(entry.status)) {
					labels.add(entry.label.id)
				}
			}
		}

		return this.labels.filter(entry => labels.has(entry.id))
	}

	/**
	 * @method getTrainImages
	 * @since 1.0.0
	 * @hidden
	 */
	private getTrainImages() {
		return this.images.map(image => ({ ...image, annotations: this.getTraintableAnnotations(image.annotations) })).filter(image => image.annotations.length > 0)
	}

	/**
	 * @method getTrainLabels
	 * @since 1.0.0
	 * @hidden
	 */
	private getTrainLabelsMap(labels: Array<ObjectClassificationModelLabelData>, labelsMap: Dictionary<number>) {

		/*
		 * Converts UUID to index based id for labels.
		 */

		/**
		 * @function convert
		 * @since 1.0.0
		 * @hidden
		 */
		function convert(acc: Dictionary<ObjectClassificationTrainManifestLabelData>, val: ObjectClassificationModelLabelData) {

			let {
				id,
				name,
				title,
				color,
				createdAt,
				updatedAt
			} = val

			id = String(labelsMap[val.id])

			if (acc[id] == null) {
				acc[id] = {
					id,
					name,
					title,
					color,
					createdAt,
					updatedAt
				}
			}

			return acc
		}

		return labels.reduce(convert, {})
	}

	/**
	 * @method getTrainImages
	 * @since 1.0.0
	 * @hidden
	 */
	private getTrainImagesMap(images: Array<ObjectClassificationModelImageData>, imagesMap: Dictionary<number>, labelsMap: Dictionary<number>) {

		/*
		 * Converts UUID to index based id for images.
		 */

		let manifest = this.modelManifest

		/**
		 * @function convert
		 * @since 1.0.0
		 * @hidden
		 */
		function convert(acc: Dictionary<ObjectClassificationTrainManifestImageData>, val: ObjectClassificationModelImageData) {

			let {
				id,
				annotations
			} = val

			let entry = manifest.data.images.find(entry => entry.id == id)
			if (entry == null) {
				throw new Error()
			}

			id = String(imagesMap[val.id])

			let {
				size,
				filename,
				filepath,
				filesize,
				createdAt,
				updatedAt
			} = entry

			if (acc[id] == null) {
				acc[id] = {
					id,
					size,
					filename,
					filepath,
					filesize,
					createdAt,
					updatedAt,
					annotations: annotations.map(annotation => ({
						...annotation,
						label: String(labelsMap[annotation.label.id]),
					}))
				}
			}

			return acc
		}

		return images.reduce(convert, {})
	}

	/**
	 * @method getTraintableAnnotations
	 * @since 1.0.0
	 * @hidden
	 */
	private getTraintableAnnotations(annotations: Array<ObjectClassificationModelAnnotationData>) {
		return annotations.filter(entry => this.isTrainableStatus(entry.status))
	}

	/**
	 * @method isTrainableStatus
	 * @since 1.0.0
	 * @hidden
	 */
	private isTrainableStatus(status: MyObjectClassificationModelAnnotationStatus) {

		if (this.config.train.includeSuggested) {

			return (
				status == MyObjectClassificationModelAnnotationStatus.Confirmed ||
				status == MyObjectClassificationModelAnnotationStatus.Suggested
			)
		}

		return status == MyObjectClassificationModelAnnotationStatus.Confirmed
	}

	/**
	 * @method save
	 * @since 1.0.0
	 * @hidden
	 */
	private save(path: string, data: ArrayBuffer) {
		return fs.writeFileSync(path, Buffer.from(data))
	}

	/**
	 * @method save
	 * @since 1.0.0
	 * @hidden
	 */
	private async read(url: string) {

		let response = await fetch(url)
		if (response.ok) {
			return response.arrayBuffer()
		}

		return null
	}
}
