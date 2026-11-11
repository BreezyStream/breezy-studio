import EventEmitter from 'events'
import os from 'os'
import path from 'path'
import { spawn } from 'child_process'
import { ChildProcessWithoutNullStreams } from 'child_process'

/**
 * @class TensorflowPythonProcess
 * @since 1.0.0
 */
export class TensorflowPythonProcess extends EventEmitter {

	/**
	 * @property path
	 * @since 1.0.0
	 * @hidden
	 */
	private exec: Array<string>

	/**
	 * @property args
	 * @since 1.0.0
	 * @hidden
	 */
	private args: Array<string>

	/**
	 * @property process
	 * @since 1.0.0
	 * @hidden
	 */
	private process: ChildProcessWithoutNullStreams | null = null

	/**
	 * @constuctor
	 * @since 1.0.0
	 */
	public constructor(exec: Array<string>, args: Array<string>) {
		super()
		this.exec = exec
		this.args = args
	}

	/**
	 * @method spawn
	 * @since 1.0.0
	 */
	public spawn(cwd?: string) {

		let envPath = this.getEnvPath()
		let exePath = this.getExePath(envPath)

		let env = {
			...process.env,
			PATH: this.getSearchPath(envPath),
			PYTHONNOUSERSITE: '1',
			PYTHONDONTWRITEBYTECODE: '1',
			PYTHONUNBUFFERED: '1',

			// Windows pipes default to the system code page, which can't
			// encode the characters some libraries print (e.g. the ONNX
			// exporter's ✅), and the print raises.
			PYTHONUTF8: '1',
			PYTHONIOENCODING: 'utf-8',
		}

		this.process = spawn(exePath, [path.join(process.env.resources, ...this.exec), ...this.args], { env, cwd })
		this.process.stdout.on('data', this.onOutMessage.bind(this))
		this.process.stderr.on('data', this.onErrMessage.bind(this))
		this.process.on('close', this.onClose.bind(this))
		this.process.on('error', this.onError.bind(this))
	}

	/**
	 * @method kill
	 * @since 1.0.0
	 */
	public kill() {
		if (this.process) {
			this.process.kill()
		}
	}

	/**
	 * @method wait
	 * @since 1.0.0
	 */
	public async wait() {
		return new Promise<number | null>((resolve, reject) => {
			this.once('done', resolve)
			this.once('fail', reject)
		})
	}

	//--------------------------------------------------------------------------
	// Private API
	//--------------------------------------------------------------------------

	/**
	 * @property stdout
	 * @since 1.0.0
	 * @hidden
	 */
	private stdout: string = ''

	/**
	 * @property stderr
	 * @since 1.0.0
	 * @hidden
	 */
	private stderr: string = ''

	/**
	 * @method getEnvPath
	 * @since 1.0.0
	 * @hidden
	 */
	private getEnvPath() {

		let value = os.platform() === 'win32'
			? path.join(process.env.resources, 'python', 'win')
			: path.join(process.env.resources, 'python', 'mac')

		return value
	}

	/**
	 * @method getSearchPath
	 * @since 1.0.0
	 * @hidden
	 */
	private getSearchPath(envPath: string) {

		let value = process.env.PATH ?? ''

		if (os.platform() === 'win32') {

			let dirs = [
				envPath,
				path.join(envPath, 'Library', 'bin'),
				path.join(envPath, 'Scripts'),
			]

			value = [...dirs, value].join(path.delimiter)
		}

		return value
	}

	/**
	 * @method getExePath
	 * @since 1.0.0
	 * @hidden
	 */
	private getExePath(envPath: string) {

		let value = os.platform() === 'win32'
			? path.join(envPath, /*  */ 'python.exe')
			: path.join(envPath, 'bin', 'python')

		return value
	}

	/**
	 * @method onOutMessage
	 * @since 1.0.0
	 * @hidden
	 */
	private onOutMessage(message: Buffer) {

		console.log(`STDOUT: ${message}`)

		this.stdout += message.toString()

		let data = this.stdout.split('\n')

		let last = data.pop()
		if (last == null) {
			last = ''
		}

		this.stdout = last

		for (let line of data) {

			line = line.trim()

			if (line == '') {
				continue
			}

			this.emit('stdout', line)
		}
	}

	/**
	 * @method onErrMessage
	 * @since 1.0.0
	 * @hidden
	 */
	private onErrMessage(message: Buffer) {

		console.log(`STDERR: ${message}`)

		this.stderr += message.toString()

		let data = this.stderr.split('\n')

		let last = data.pop()
		if (last == null) {
			last = ''
		}

		this.stderr = last

		for (let line of data) {

			line = line.trim()

			if (line == '') {
				continue
			}

			this.emit('stderr', line)
		}
	}

	/**
	 * @method onClose
	 * @since 1.0.0
	 * @hidden
	 */
	private onClose(code: number | null) {
		this.emit('done', code)
	}

	/**
	 * @method onError
	 * @since 1.0.0
	 * @hidden
	 */
	private onError(error: Error) {
		this.emit('fail', error)
	}
}