import { CombinedGraphQLErrors } from 'libs/apollo'
import { CombinedProtocolErrors } from 'libs/apollo'
import { ErrorLike } from 'libs/apollo'
import { LocalStateError } from 'libs/apollo'
import { ServerError } from 'libs/apollo'
import { ServerParseError } from 'libs/apollo'
import { UnconventionalError } from 'libs/apollo'

/**
 * @function isApolloError
 * @since 1.0.0
 */
export function isApolloError(error: unknown): error is ErrorLike {

	if (CombinedGraphQLErrors.is(error) ||
		CombinedProtocolErrors.is(error) ||
		LocalStateError.is(error) ||
		ServerError.is(error) ||
		ServerParseError.is(error) ||
		UnconventionalError.is(error)) {
		return true
	}

	return false
}