const { ipcRenderer, contextBridge } = require('electron');


type IpcRendererEventListener = any

/**
 * @const electron
 * @since 1.0.0
 */
contextBridge.exposeInMainWorld('electron', {

	/**
	 * @function invoke
	 * @since 1.0.0
	 */
	invoke(channel: string, ...args: Array<any>) {
		return ipcRenderer.invoke(channel, ...args)
	},

	/**
	 * @function send
	 * @since 1.0.0
	 */
	send(channel: string, ...args: Array<any>) {
		return ipcRenderer.send(channel, ...args)
	},

	/**
	 * @function on
	 * @since 1.0.0
	 */
	on(channel: string, listener: IpcRendererEventListener) {
		return ipcRenderer.on(channel, listener)
	},

	/**
	 * @function off
	 * @since 1.0.0
	 */
	off(channel: string, listener: IpcRendererEventListener) {
		return ipcRenderer.off(channel, listener)
	},

	/**
	 * @function once
	 * @since 1.0.0
	 */
	once(channel: string, listener: IpcRendererEventListener) {
		return ipcRenderer.once(channel, listener)
	}

})
