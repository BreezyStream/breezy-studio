import { CombinedGraphQLErrors } from 'libs/apollo'
import { CombinedProtocolErrors } from 'libs/apollo'
import { ErrorLink } from 'libs/apollo'

/**
 * @function createErrorLink
 * @since 1.0.0
 */
export function createErrorLink() {
	return new ErrorLink(onError)
}

//------------------------------------------------------------------------------
// Private API
//------------------------------------------------------------------------------

/**
 * @function onError
 * @since 1.0.0
 * @hidden
 */
function onError(options: ErrorLink.ErrorHandlerOptions) {

	let {
		error
	} = options

	if (CombinedGraphQLErrors.is(error)) {

		error.errors.forEach(entry => {

			let {
				path,
				message,
				locations,
				extensions
			} = entry

			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)

			if (extensions) {

				let {
					code
				} = extensions

				if (code == 'NOT_AUTHORIZED') {
					location.href = '/signin'
				}

			}

		})

	} else if (CombinedProtocolErrors.is(error)) {

		error.errors.forEach(({ message, extensions }) =>
			console.log(`[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(extensions)}`
			)
		)

	} else {

		if (error.name == 'AbortError') {
			return
		}

		console.error(`[Network error]: ${error}`);
	}
}