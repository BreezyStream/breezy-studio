import fetch from 'node-fetch'
import progress from 'progress-stream'
import { File } from 'buffer'
import { session } from 'electron'
import { FormDataEncoder } from 'form-data-encoder'
import { RequestInfo } from 'node-fetch'
import { RequestInit } from 'node-fetch'
import { Readable } from 'stream'
import { UploadHttpLink } from 'libs/apollo'

/**
 * @interface HttpLinkOptions
 * @since 1.0.0
 */
export interface HttpLinkOptions {
	onProgress?(progress: number, remaining: number): void
}

/**
 * Manages http connections.
 * @function createHttpLink
 * @since 1.0.0
 */
export async function createHttpLink(options?: HttpLinkOptions) {

	let uri = process.env.API_URL

	let fetch = request
	let fetchOptions = {
		onProgress: options?.onProgress
	}

	let token = await getToken()

	return new UploadHttpLink({

		uri: uri,
		credentials: 'include',

		headers: {
			'apollo-require-preflight': 'true',
			'cookie': `token=${token}`
		},

		isExtractableFile,

		fetch: fetch as any,
		fetchOptions: fetchOptions as any

	})
}

//------------------------------------------------------------------------------
// Private API
//------------------------------------------------------------------------------

/**
 * @function isExtractableFile
 * @since 1.0.0
 * @hidden
 */
function isExtractableFile(value: unknown): value is File {
	return value instanceof File
}

/**
 * @function getCookie
 * @since 1.0.0
 * @hidden
 */
async function getToken(): Promise<any> {

	let cookie = await session.defaultSession.cookies.get({ url: process.env.API_URL, name: 'token' }).then(cookies => cookies.pop())
	if (cookie) {
		return cookie.value

	}

	return ''
}

/**
 * @function request
 * @since 1.0.0
 * @hidden
 */
function request(url: URL | RequestInfo, options?: RequestInit & HttpLinkOptions) {

	if (options?.body instanceof FormData) {

		let encoder = new FormDataEncoder(options.body)
		let encoded = Readable.from(
			encoder.encode()
		)

		let progressStream = progress({
			length: Number(encoder.headers['Content-Length']),
			time: 100,
		})

		progressStream.on('progress', (p) => {
			if (options &&
				options.onProgress) {
				options.onProgress(
					p.percentage / 100,
					p.remaining
				)
			}
		})

		let stream = encoded.pipe(progressStream)

		let headers = {
			...encoder.headers,
			...options.headers
		}

		delete headers['Content-Length']

		return fetch(url, {
			...options,
			headers,
			body: stream as unknown as RequestInit['body'],
		})
	}

	return fetch(url, options)
}
