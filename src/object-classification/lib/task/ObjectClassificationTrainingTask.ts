import fs from 'fs'
import { app } from 'electron'
import { Task } from 'libs/task/Task'
import { ObjectClassificationModelData } from 'object-classification/main.generated'
import { ObjectClassificationTrainingSessionConfig } from 'object-classification/types'


/**
 * @class ObjectClassificationTrainingTask
 * @since 1.0.0
 */
export class ObjectClassificationTrainingTask extends Task {

	/**
	 * @property model
	 * @since 1.0.0
	 */
	public readonly model: ObjectClassificationModelData

	/**
	 * @property config
	 * @since 1.0.0
	 */
	public readonly config: ObjectClassificationTrainingSessionConfig

	/**
	 * @constructor
	 * @since 1.0.0
	 */
	public constructor(model: ObjectClassificationModelData, config: ObjectClassificationTrainingSessionConfig) {
		super()
		this.model = model
		this.config = config
	}

	/**
	 * @method copyFile
	 * @since 1.0.0
	 */
	public createDir(path: string) {
		if (fs.existsSync(path) == false) {
			fs.mkdirSync(path, { recursive: true })
		}
	}

	/**
	 * @function removeDir
	 * @since 1.0.0
	 * @hidden
	 */
	public removeDir(path: string) {
		fs.rmSync(path, { recursive: true, force: true })
	}

	/**
	 * @function copyFile
	 * @since 1.0.0
	 * @hidden
	 */
	public copyFile(src: string, dst: string) {
		fs.copyFileSync(src, dst)
	}

	/**
	 * @function getRootPath
	 * @since 1.0.0
	 * @hidden
	 */
	public getRootPath() {
		return process.env.root
	}

	/**
	 * @function getDataPath
	 * @since 1.0.0
	 * @hidden
	 */
	public getDataPath() {
		return app.getPath('userData')
	}
}