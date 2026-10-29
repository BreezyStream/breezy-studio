import type { CodegenConfig } from '@graphql-codegen/cli'


const config: CodegenConfig = {

	schema: 'https://breezy.test/client',
	overwrite: true,

	ignoreNoDocuments: true,

	config: {

		scalars: {

			Object: {
				input: 'Record<string, unknown>',
				output: 'Record<string, unknown>'
			},

			Seed: {
				input: 'string',
				output: 'string'
			},

			Timestamp: {
				input: 'number | string',
				output: 'string'
			},

			Upload: {
				input: 'any',
				output: 'never'
			}
		}
	},

	generates: {

		'src/graphql/schema.generated.ts': {
			plugins: [
				'typescript'
			]
		},

		'src/': {

			preset: 'near-operation-file',

			presetConfig: {
				baseTypesPath: 'graphql/schema.generated.ts',
				extension: '.generated.ts'
			},

			plugins: [
				'typescript-operations',
				'typed-document-node'
			],

			documents: 'src/**/*.graphql',

			config: {
				omitOperationSuffix: true,
				operationResultSuffix: 'Result',
				documentVariableSuffix: ''
			}
		}
	}
}

export default config
