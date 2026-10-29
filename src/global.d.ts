type ID = string

/**
 * @type Dictionary
 * @since 1.0.0
 */
interface Dictionary<T> {
	[index: string]: T;
}

/**
 * @namespace NodeJS
 * @since 1.0.0
 */
declare namespace NodeJS {

	/**
	 * Fixes an annoying problem.
	 * @since 1.0.0
	 */
	interface Process {
		env: {
			root: string
			resources: string
			PATH?: string
			DEV: string
			BREEZY_DEV?: string
			API_URL: string
			APP_URL: string
			NODE_TLS_REJECT_UNAUTHORIZED?: string
		}
	}

}