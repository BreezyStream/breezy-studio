import './name'
import path from 'path'
import { launch } from 'app'
import { app } from 'electron'

/**
 * The root path.
 * @const process.env.root
 * @since 1.0.0
 */
process.env.root = path.dirname(import.meta.dirname)

/**
 * The resources path, where the python environment and scripts live.
 * @const process.env.resources
 * @since 1.0.0
 */
process.env.resources = app.isPackaged ? process.resourcesPath : process.env.root

/**
 * Whether the app runs against the local development server. BREEZY_DEV=1
 * tests a packaged build against breezy.test, BREEZY_DEV=0 runs an unpackaged
 * build against production.
 * @const process.env.DEV
 * @since 1.0.0
 */
process.env.DEV = (process.env.BREEZY_DEV ? process.env.BREEZY_DEV == '1' : app.isPackaged == false) ? '1' : '0'

/**
 * Environments variables.
 * @const process.env.APP_URL
 * @const process.env.API_URL
 * @since 1.0.0
 */

if (process.env.DEV == '1') {
	process.env.APP_URL = 'https://breezy.test:8080'
	process.env.API_URL = 'https://breezy.test/client'
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
} else {
	process.env.APP_URL = 'https://my.breezy.stream'
	process.env.API_URL = 'https://api.breezy.stream/client'
}

/**
 * Catches uncaught exceptions.
 * @since 1.0.0
 */
process.on('uncaughtException', (err: Error) => {
	console.error('Error', 'Uncaught exception.', err)
})

/**
 * Catches unhandled rejections.
 * @since 1.0.0
 */
process.on('unhandledRejection', (err: Error) => {
	console.error('Error', 'Unhandled rejection.', err)
})

/**
 * Launches the application.
 * @since 1.0.0
 */
launch()
