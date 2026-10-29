import { ipcMain } from 'electron'
import { BrowserWindow } from 'electron'
import { IpcMain } from 'electron'
import { IpcMainInvokeEvent } from 'electron'

/**
 * @class Bridge
 * @since 1.0.0
 */
export class Bridge {

	//--------------------------------------------------------------------------
	// Static
	//--------------------------------------------------------------------------

	/**
	 * @property instance
	 * @since 1.0.0
	 */
	public static instance: Bridge

	/**
	 * @method init
	 * @since 1.0.0
	 */
	public static init(window: BrowserWindow) {
		this.instance = new this(window)
	}

	//--------------------------------------------------------------------------
	// Properties
	//--------------------------------------------------------------------------

	/**
	 * @property window
	 * @since 1.0.0
	 */
	public readonly window: BrowserWindow

	//--------------------------------------------------------------------------
	// Methods
	//--------------------------------------------------------------------------

	/**
	 * @constructor
	 * @since 1.0.0
	 */
	public constructor(window: BrowserWindow) {
		this.window = window
	}

	/**
	 * @function handle
	 * @since 1.0.0
	 */
	public handle(channel: string, listener: IPCMainEventListener) {
		return ipcMain.handle(channel, listener)
	}

	/**
	 * @function on
	 * @since 1.0.0
	 */
	public on(channel: string, listener: IPCMainEventListener) {
		ipcMain.on(channel, listener)
		return this
	}

	/**
	 * @function off
	 * @since 1.0.0
	 */
	public off(channel: string, listener: IPCMainEventListener) {
		ipcMain.off(channel, listener)
		return this
	}

	/**
	 * @function once
	 * @since 1.0.0
	 */
	public once(channel: string, listener: IPCMainEventListener) {
		ipcMain.once(channel, listener)
		return this
	}

	/**
	 * @function send
	 * @since 1.0.0
	 */
	public send(channel: string, ...args: Array<any>) {
		return this.window.webContents.send(channel, ...args)
	}

	//--------------------------------------------------------------------------
	// Private API
	//--------------------------------------------------------------------------
}

type IPCMainEventListener = (event: IpcMainInvokeEvent, ...args: Array<any>) => void