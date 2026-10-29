import { CombinedGraphQLErrors } from 'libs/apollo'
import { CombinedProtocolErrors } from 'libs/apollo'

/**
 * @function isApolloCombinedError
 * @since 1.0.0
 */
export function isApolloCombinedError(error: unknown): error is CombinedGraphQLErrors | CombinedProtocolErrors {

	if (CombinedGraphQLErrors.is(error) ||
		CombinedProtocolErrors.is(error)) {
		return true
	}

	return false
}