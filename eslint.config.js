import tsParser from '@typescript-eslint/parser';
import unusedImports from 'eslint-plugin-unused-imports';
import sortImports from './scripts/eslint-rules/sort-imports.mjs';

export default [
	// Ignore common build/artifact folders
	{
		ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**'],
	},

	// Apply rules to JS/TS files
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2022,
			sourceType: 'module',
		},
		plugins: {
			'unused-imports': unusedImports,
		},
		rules: {
			'unused-imports/no-unused-imports': 'error',
			'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1, maxEOF: 1 }],
		},
	},

	// Same import ordering as the logaritm.typescript.sort-import VS Code extension
	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			'logaritm': { rules: { 'sort-imports': sortImports } },
		},
		rules: {
			'logaritm/sort-imports': 'error',
		},
	},
];
