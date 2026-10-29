import { ObjectClassificationManifest } from 'object-classification/lib/manifest/ObjectClassificationManifest'
import { Size } from 'object-classification/types'

/**
 * @interface ObjectClassificationModelManifestData
 * @since 1.0.0
 */
export interface ObjectClassificationModelManifestData {
	images: Array<ObjectClassificationModelManifestImageData>
}

/**
 * @type ObjectClassificationModelManifestImageData
 * @since 1.0.0
 */
export interface ObjectClassificationModelManifestImageData {
	id: string | number
	size: Size
	filename: string
	filepath: string
	filesize: number
	createdAt: string
	updatedAt: string
}

/**
 * @class ObjectClassificationModelManifest
 * @since 1.0.0
 */
export class ObjectClassificationModelManifest extends ObjectClassificationManifest<ObjectClassificationModelManifestData> {

	/**
	 * @constructor
	 * @since 1.0.0
	 */
	public constructor(path: string) {
		super(path, { images: [] })
	}
}