/**
 * @type Point
 * @since 1.0.0
 */
export type Point = {
	x: number
	y: number
}

/**
 * @type Frame
 * @since 1.0.0
 */
export type Frame = {
	origin: Point
	anchor: Point
	size: Size
}

/**
 * @type Size
 * @since 1.0.0
 */
export type Size = {
	w: number
	h: number
}


/**
 * @type ObjectClassificationModelMetrics
 * @since 1.0.0
 */
export type ObjectClassificationModelMetrics = {
	loss: number
	accuracy: number
	precision: number
	recall: number
	rocAuc: number
	prAuc: number
	f1: number
}

/**
 * @type ObjectClassificationModelClassMetrics
 * @since 1.0.0
 */
export type ObjectClassificationModelClassMetrics = {
	precision?: number
	recall?: number
	f1?: number
	support: number
}

/**
 * @type ObjectClassificationModelClass
 * @since 1.0.0
 */
export type ObjectClassificationModelClass = {
	id: string
	name: string
	label: string
	color: string | null
	index: number
}

/**
 * @type ObjectClassificationModelConfig
 * @since 1.0.0
 */
export type ObjectClassificationModelConfig = {
	rootPath: string
	dataPath: string
	manifestPath: string
}

/**
 * @type ObjectClassificationTrainConfig
 * @since 1.0.0
 */
export type ObjectClassificationTrainConfig = {
	imageSize: number
	imageChan: number
	batchSize: number
	dropoutRate: number
	epochs: number
	quantization: string
	includeSuggested: boolean
	rootPath: string
	distPath: string
	manifestPath: string
}

/**
 * @type ObjectClassificationTrainingSessionConfig
 * @since 1.0.0
 */
export type ObjectClassificationTrainingSessionConfig = {
	model: ObjectClassificationModelConfig
	train: ObjectClassificationTrainConfig
}

/**
 * @type ObjectClassificationTrainingSessionOptions
 * @since 1.0.0
 */
export type ObjectClassificationTrainingSessionOptions = {
	imageSize: number
	imageChan: number
	batchSize: number
	dropoutRate: number
	epochs: number
	quantization: string
	includeSuggested: boolean
}

/**
 * @type ObjectClassificationTrainingSession
 * @since 1.0.0
 */
export type ObjectClassificationTrainingSession = {
	id: string
	step: ObjectClassificationTrainingSessionStep
	data: ObjectClassificationTrainingSessionData
}

/**
 * @type ObjectClassificationTrainingSessionStep
 * @since 1.0.0
 */
export enum ObjectClassificationTrainingSessionStep {
	Starting = 'STARTING',
	PrepareModel = 'PREPARE_MODEL',
	PrepareTrain = 'PREPARE_TRAIN',
	Train = 'TRAIN',
	Valid = 'VALID',
	Export = 'EXPORT',
	Upload = 'UPLOAD',
	Cleanup = 'CLEANUP'
}

/**
 * @type ObjectClassificationTrainingSessionData
 * @since 1.0.0
 */
export type ObjectClassificationTrainingSessionData = {

	/* Set by the trainer on every update */
	updatedAt: number

	/* Shared by PrepareTrain and Train, between 0 and 1 */
	progress?: number

	/* PrepareTrain: images processed / to process. Train: rounds to run */
	count?: number
	total?: number

	/* Train */
	epoch?: number
	startedAt?: number
	history?: Array<ObjectClassificationTrainingSessionRound>
}

/**
 * @type ObjectClassificationTrainingSessionRound
 * @since 1.0.0
 */
export type ObjectClassificationTrainingSessionRound = {
	epoch: number
	score: number
	time: number
}
