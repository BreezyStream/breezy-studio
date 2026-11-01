import fs from 'fs'
import path from 'path'
import { app } from 'electron'
import { desktopCapturer } from 'electron'
import { nativeImage } from 'electron'
import { screen } from 'electron'
import { session } from 'electron'
import { BrowserWindow } from 'electron'
import { Menu } from 'electron'
import { UnexpectedError } from 'libs/error/UnexpectedError'
import { Storage } from 'libs/storage/Storage'
import { ObjectClassificationModelTrainer } from 'object-classification/main'

/**
 * @function launch
 * @since 1.0.0
 */
export function launch() {

	/**
	 * @var window
	 * @since 1.0.0
	 * @hidden
	 */
	let window: BrowserWindow | null = null

	/**
	 * @var objectClassificationModelTrainer
	 * @since 1.0.0
	 */
	let objectClassificationModelTrainer: ObjectClassificationModelTrainer | null = null

	/**
	 * @method onReady
	 * @since 1.0.0
	 */
	function onReady() {
		createMenu()
		createDisplayMediaHandler()
		let window = createWindow()
		objectClassificationModelTrainer = new ObjectClassificationModelTrainer(window)
	}

	/**
	 * @method onOpenUrl
	 * @since 1.0.0
	 */
	function onOpenUrl() {

	}

	/**
	 * @method onOpenFile
	 * @since 1.0.0
	 */
	function onOpenFile() {

	}

	/**
	 * @method onQuit
	 * @since 1.0.0
	 */
	function onQuit() {

	}

	/**
	 * @method onWindowClose
	 * @since 1.0.0
	 */
	function onWindowClose() {

	}

	/**
	 * @method onWindowMoved
	 * @since 1.0.0
	 */
	function onWindowMoved() {
		updateWindowDisplaySettings()
	}

	/**
	 * @method onWindowResized
	 * @since 1.0.0
	 */
	function onWindowResized() {
		updateWindowDisplaySettings()
	}

	/**
	 * @function createMenu
	 * @since 1.0.0
	 */
	function createMenu() {

		// Development keeps Electron's default menu, with reload and the
		// developer tools.

		let dev = process.env.DEV == '1'
		if (dev) {
			return
		}

		// Electron's default menu, without the developer tools and Electron's
		// help links.

		let view: Electron.MenuItemConstructorOptions = {
			label: 'View',
			submenu: [
				{ role: 'reload' },
				{ role: 'forceReload' },
				{ type: 'separator' },
				{ role: 'resetZoom' },
				{ role: 'zoomIn' },
				{ role: 'zoomOut' },
				{ type: 'separator' },
				{ role: 'togglefullscreen' },
			]
		}

		let menu = process.platform === 'darwin'

			? Menu.buildFromTemplate([
				{ role: 'appMenu' },
				{ role: 'fileMenu' },
				{ role: 'editMenu' },
				view,
				{ role: 'windowMenu' },
			])

			: Menu.buildFromTemplate([
				{ role: 'fileMenu' },
				{ role: 'editMenu' },
				view,
				{ role: 'windowMenu' },
			])

		Menu.setApplicationMenu(menu)
	}

	/**
	 * @function createDisplayMediaHandler
	 * @since 1.0.0
	 */
	function createDisplayMediaHandler() {

		// Electron rejects getDisplayMedia unless a handler picks the source.
		// The system picker is used where available (macOS 15+), otherwise
		// the primary screen is shared.

		session.defaultSession.setDisplayMediaRequestHandler(async (request, callback) => {

			let [
				source
			] = await desktopCapturer.getSources({ types: ['screen'] })

			callback(
				source
					? { video: source }
					: {}
			)

		}, {
			useSystemPicker: true
		})
	}

	/**
	 * @function createWindow
	 * @since 1.0.0
	 */
	function createWindow() {

		let w = 1920
		let h = 1080
		let x: number | undefined
		let y: number | undefined

		let display = getWindowDisplaySettings()
		if (display) {
			let target = screen.getAllDisplays().find(entry => entry.id == display.target)
			if (target) {
				let bounds = target.bounds
				x = Math.max(bounds.x, display.bounds.x)
				y = Math.max(bounds.y, display.bounds.y)
			}
		}

		window = new BrowserWindow({

			x: x,
			y: y,
			width: w,
			height: h,

			webPreferences: {
				preload: path.join(process.env.root, 'dist', 'preload.js'),
				nodeIntegration: false,
				contextIsolation: true,
				devTools: process.env.DEV == '1',
			},

			icon: path.join(process.env.root, 'build', 'icons', 'icon.ico')

		})

		let dev = process.env.DEV == '1'
		if (dev) {
			//window.webContents.openDevTools()
		}

		window.loadURL(process.env.APP_URL)

		window.on('close', onWindowClose)
		window.on('moved', onWindowMoved)
		window.on('resized', onWindowResized)

		return window
	}

	/**
	 * @method updateWindowDisplaySettings
	 * @since 1.0.0
	 */
	function updateWindowDisplaySettings() {

		if (window == null) {
			throw new UnexpectedError()
		}

		let bounds = window.getBounds()
		let target = screen.getDisplayMatching(bounds)

		let {
			id
		} = target

		let settings = {
			target: id,
			bounds: bounds
		}

		setWindowDisplaySettings(settings)
	}

	/**
	 * @method getWindowDisplaySettings
	 * @since 1.0.0
	 */
	function getWindowDisplaySettings() {
		return Storage.get<WindowDisplaySettings>('window.display.settings')
	}

	/**
	 * @method setWindowDisplaySettings
	 * @since 1.0.0
	 */
	function setWindowDisplaySettings(settings: WindowDisplaySettings) {
		Storage.set('window.display.settings', settings)
	}

	app.on('ready', onReady)
	app.on('open-url', onOpenUrl)
	app.on('open-file', onOpenFile)
	app.on('quit', onQuit)

	app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
		// The local development server uses a self-signed certificate. In
		// production, invalid certificates keep Electron's default behavior
		// and are rejected.
		if (process.env.DEV == '1') {
			event.preventDefault()
			callback(true)
		}
	})
}

//------------------------------------------------------------------------------
// Private API
//------------------------------------------------------------------------------

/**
 * @interface WindowDisplaySettings
 * @since 1.0.0
 * @hidden
 */
interface WindowDisplaySettings {
	target: number
	bounds: Electron.Rectangle
}