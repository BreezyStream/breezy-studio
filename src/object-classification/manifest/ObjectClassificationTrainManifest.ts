import { MyObjectClassificationModelAnnotationStatus } from 'graphql/schema.generated'
import { ObjectClassificationManifest } from 'object-classification/lib/manifest/ObjectClassificationManifest'
import { ObjectClassificationTrainConfig } from 'object-classification/types'
import { Size } from 'object-classification/types'

/**
 * @interface ObjectClassificationTrainManifestData
 * @since 1.0.0
 */
export interface ObjectClassificationTrainManifestData {
	config: ObjectClassificationTrainConfig
	images: Dictionary<ObjectClassificationTrainManifestImageData>
	labels: Dictionary<ObjectClassificationTrainManifestLabelData>
}

/**
 * @interface ObjectClassificationTrainManifestImageData
 * @since 1.0.0
 */
export interface ObjectClassificationTrainManifestImageData {
	id: ID
	size: Size
	filename: string
	filepath: string
	filesize: number
	createdAt: string
	updatedAt: string
	annotations: Array<ObjectClassificationTrainManifestAnnotationData>
}

/**
 * @interface ObjectClassificationTrainManifestLabelData
 * @since 1.0.0
 */
export interface ObjectClassificationTrainManifestLabelData {
	id: ID
	name: string
	title: string
	color: string | null
	createdAt: string
	updatedAt: string
}

/**
 * @interface ObjectClassificationTrainManifestAnnotationData
 * @since 1.0.0
 */
export interface ObjectClassificationTrainManifestAnnotationData {
	id: ID
	label: ID
	status: MyObjectClassificationModelAnnotationStatus
	createdAt: string
	updatedAt: string
}

/**
 * @class ObjectClassificationTrainManifest
 * @since 1.0.0
 */
export class ObjectClassificationTrainManifest extends ObjectClassificationManifest<ObjectClassificationTrainManifestData> {

	/**
	 * @constructor
	 * @since 1.0.0
	 */
	public constructor(path: string) {
		super(path, { images: {}, labels: {}, config: { batch: 8, epochs: 30 } as any })
	}
}
