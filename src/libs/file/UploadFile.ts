import fs from 'fs'

/**
 * @class UploadFile
 * @since 1.0.0
 */
export class UploadFile extends File {

	/**
	 * @method from
	 * @since 1.0.0
	 */
	public static async from(filename: string, filepath: string, mimetype: string) {
		return new UploadFile(filename, mimetype, await fs.promises.readFile(filepath))
	}

	/**
	 * @constructor
	 * @since 1.0.0
	 */
	constructor(filename: string, mimetype: string, buffer: Buffer) {
		super([buffer as any], filename, { type: mimetype, lastModified: Date.now() })
	}

}