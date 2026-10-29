import fs from 'fs'

/**
 * @class ObjectClassificationManifest
 * @since 1.0.0
 */
export class ObjectClassificationManifest<T extends object> {

	/**
	 * @property content
	 * @since 1.0.0
	 */
	public readonly path: string

	/**
	 * @property content
	 * @since 1.0.0
	 */
	public readonly data: T

	/**
	 * @constructor
	 * @since 1.0.0
	 */
	public constructor(path: string, defaults: T) {

		let data = this.json(path)

		if (data == null) {
			data = {}
		}

		data = { ...defaults, ...data }

		this.path = path
		this.data = data
	}

	/**
	 * @method save
	 * @since 1.0.0
	 * @hidden
	 */
	public save() {
		this.json(this.path, this.data)
	}

	//--------------------------------------------------------------------------
	// Private API
	//--------------------------------------------------------------------------

	/**
	 * @method json
	 * @since 1.0.0
	 * @hidden
	 */
	private json(path: string, data: any = null) {

		if (data) {

			let json = encode(data)
			if (json) {
				save(path, json)
			}

		} else {

			let content = read(path)
			if (content) {
				return decode(content)
			}

		}

		return null
	}
}

//------------------------------------------------------------------------------
// Private API
//------------------------------------------------------------------------------

/**
 * @function encode
 * @since 1.0.0
 * @hidden
 */
function encode(input: object) {

	try {
		return JSON.stringify(input)
	} catch { }

	return null
}

/**
 * @function decode
 * @since 1.0.0
 * @hidden
 */
function decode(input: string) {

	try {
		return JSON.parse(input)
	} catch { }

	return null
}

/**
 * @function read
 * @since 1.0.0
 * @hidden
 */
function read(path: string) {
	return fs.existsSync(path) ? fs.readFileSync(path, 'utf-8') : null
}

/**
 * @function write
 * @since 1.0.0
 * @hidden
 */
function save(path: string, data: any) {
	return fs.writeFileSync(path, data)
}