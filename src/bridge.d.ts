import { IpcRendererEvent } from 'electron'

type IpcRendererEventListener = (event: IpcRendererEvent, ...args: any[]) => void

interface ElectronAPI {
	invoke(channel: string, ...args: any[]): Promise<any>
	send(channel: string, ...args: any[]): void
	on(channel: string, listener: IpcRendererEventListener): void
	off(channel: string, listener: IpcRendererEventListener): void
	once(channel: string, listener: IpcRendererEventListener): void
}

declare global {
	const electron: ElectronAPI
}
