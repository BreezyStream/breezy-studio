import { createErrorLink } from 'libs/apollo/link/ErrorLink'
import { createHttpLink } from 'libs/apollo/link/HttpLink'
import { ApolloClient } from 'libs/apollo'
import { ApolloLink } from 'libs/apollo'
import { InMemoryCache } from 'libs/apollo'
import { HttpLinkOptions } from 'libs/apollo/link/HttpLink'

/**
 * @function createApolloClient
 * @since 1.0.0
 */
export async function createApolloClient(options?: HttpLinkOptions) {

	/**
	 * Initialize the apollo client.
	 * @since 1.0.0
	 */
	const client = new ApolloClient({

		link: ApolloLink.from([
			await createErrorLink(),
			await createHttpLink(options)
		]),

		cache: new InMemoryCache({

		})

	})

	return client
}