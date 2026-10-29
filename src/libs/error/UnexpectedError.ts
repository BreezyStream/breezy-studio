
/**
 * @class UnexpectedError
 * @since 1.0.0
 */
export class UnexpectedError extends Error {

	/**
	 * @constructor
	 * @since 1.0.0
	 */
	constructor(message = 'Unexpected error') {
		super(message)
	}
}