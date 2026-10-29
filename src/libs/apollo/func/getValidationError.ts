import { CombinedGraphQLErrors } from 'libs/apollo'
import { ErrorLike } from 'libs/apollo'

/**
 * @function getValidationError
 * @since 1.0.0
 */
export function getValidationError(error: ErrorLike, input: string = '') {

	let title = error.message
	let infos = ''
	let field = ''

	if (CombinedGraphQLErrors.is(error)) {

		let {
			errors
		} = error

		for (let error of errors) {

			let {
				extensions
			} = error

			if (extensions == null) {
				continue
			}

			let errorInfos = extensions.infos as any
			let errorInput = extensions.input as any

			if (errorInfos ||
				errorInput) {
				infos = errorInfos
				field = errorInput[input]
				break
			}
		}
	}

	return {
		title,
		infos,
		field
	}
}