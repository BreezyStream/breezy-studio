/**
 * Port of the logaritm.typescript.sort-import VS Code extension, so that
 * `npm run tidy` produces the same import ordering as sort-on-save.
 *
 * Settings baked in (from the user's VS Code settings):
 * quoteStyle: single, maxNamedImportsInSingleLine: 1,
 * multilineIndention: namesAndPath, bracketWhitespace: true,
 * forceTrailingCommas: never, maxLineLength: 0.
 *
 * Add `disable-sort-imports` in a comment to opt a file out.
 */

//------------------------------------------------------------------------------
// Parsing
//------------------------------------------------------------------------------

const name = `((?!\\d)(?:(?!\\s)[$\\w\\u0080-\\uFFFF]|\\\\u[\\da-fA-F]{4}|\\\\u\\{[\\da-fA-F]+\\})+)`
const ws = `\\s`
const spaceNoReturns = `[^\\S\\r\\n]`

const namespaceToken = `\\*\\s+as\\s+(${name})`
const defaultImportToken = name
const destructingImportToken = `(${name})(\\s+as\\s+(${name}))?`
const destructingImport = `{(${ws}*${destructingImportToken}(${ws}*,${ws}*${destructingImportToken})*${ws}*)}`
const defaultAndDestructingImport = `${defaultImportToken}${ws}*,${ws}*${destructingImport}`
const combinedImportTypes = `(${namespaceToken}|${defaultImportToken}|${destructingImport}|${defaultAndDestructingImport})`
const inlineComment = `(${spaceNoReturns}*[\\/]{2}.*)?`
const importRegexString = `^import\\s+(${combinedImportTypes}\\s+from\\s+)?['"]([@\\w\\\\/\.-]+)['"];?${inlineComment}\\r?\\n?`

const destructingImportTokenRegex = new RegExp(destructingImportToken)

const parseDestructiveImports = (destructiveImports) => {

	if (!destructiveImports) {
		return null
	}

	return destructiveImports.split(',').map(destructiveImport => {
		const match = destructingImportTokenRegex.exec(destructiveImport)
		return {
			alias: match[4],
			importName: match[1]
		}
	})
}

const parseImportNodes = (source) => {

	const importRegex = new RegExp(importRegexString, 'gm')
	const imports = []

	let match
	while ((match = importRegex.exec(source))) {
		imports.push({
			default: match[5] || match[18],
			namedImports: parseDestructiveImports(match[6] || match[19]),
			namespace: match[3],
			path: match[31],
			start: match.index,
			end: importRegex.lastIndex
		})
	}

	return imports
}

//------------------------------------------------------------------------------
// Sorting
//------------------------------------------------------------------------------

const isFirstLetterLowercase = (string) => {
	return string[0] == string[0].toLowerCase()
}

const compareModuleName = (a, b) => {

	let aStartsWithLowercase = isFirstLetterLowercase(a)
	let bStartsWithLowercase = isFirstLetterLowercase(b)

	if (aStartsWithLowercase &&
		bStartsWithLowercase) {
		return a.localeCompare(b, 'en', { sensitivity: 'base' })
	}

	if (aStartsWithLowercase) {
		return -1
	}

	if (bStartsWithLowercase) {
		return +1
	}

	return a.localeCompare(b, 'en', { sensitivity: 'base' })
}

const compareModulePath = (a, b) => {
	return a.localeCompare(b, 'en', { sensitivity: 'base' })
}

const compareGlobalModule = (a, b) => {

	let aName = ''
	let bName = ''

	let aNodes = a.path.split('/')
	let bNodes = b.path.split('/')

	if (aNodes.length == bNodes.length || aNodes[0] == bNodes[0]) {

		if (a.namedImports &&
			b.namedImports) {
			aName = a.namedImports[0].importName
			bName = b.namedImports[0].importName
		}

		if (a.namedImports == null &&
			b.namedImports == null) {
			return compareLocalModule(a, b)
		} else if (a.namedImports == null) {
			return -1
		} else if (b.namedImports == null) {
			return +1
		}

		if (aNodes[0] == bNodes[0]) {
			return compareModuleName(aName, bName)
		} else {
			return compareModulePath(a.path, b.path)
		}

	} else {

		return aNodes.length - bNodes.length

	}
}

const compareLocalModule = (a, b) => {

	let aName = ''
	let bName = ''

	if (a.namedImports &&
		b.namedImports) {
		aName = a.namedImports[0].importName
		bName = b.namedImports[0].importName
	}

	let aIsSymbol = aName[0] == '$'
	let bIsSymbol = bName[0] == '$'

	if (aIsSymbol && bIsSymbol) {

		if (a.path == b.path) {
			return compareModuleName(aName, bName)
		} else {
			return compareModulePath(a.path, b.path)
		}

	} else if (aIsSymbol) {
		return -1
	} else if (bIsSymbol) {
		return +1
	}

	let aIsLowercase = aName[0].toLowerCase() == aName[0]
	let bIsLowercase = bName[0].toLowerCase() == bName[0]

	if (aIsLowercase && bIsLowercase) {

		if (a.path == b.path) {
			return compareModuleName(aName, bName)
		} else {
			return compareModulePath(a.path, b.path)
		}

	} else if (aIsLowercase) {
		return -1
	} else if (bIsLowercase) {
		return +1
	}

	if (a.path == b.path) {
		return compareModuleName(aName, bName)
	} else {
		return compareModulePath(a.path, b.path)
	}
}

const compareImports = (a, b) => {

	let aPathExt = a.path.split('.').pop()
	let bPathExt = b.path.split('.').pop()

	let aIsStyleFile = aPathExt == 'style' || aPathExt == 'scss' || aPathExt == 'json'
	let bIsStyleFile = bPathExt == 'style' || bPathExt == 'scss' || bPathExt == 'json'

	if (aIsStyleFile && bIsStyleFile) {
		return compareModuleName(a.path, b.path)
	} else if (aIsStyleFile) {
		return +1
	} else if (bIsStyleFile) {
		return -1
	}

	let aIsLocalModule = a.path.split('/').length > 1
	let bIsLocalModule = b.path.split('/').length > 1

	let aIsUnnamed = a.namedImports == null
	let bIsUnnamed = b.namedImports == null

	if (aIsUnnamed && bIsUnnamed) {
		return compareModulePath(a.path, b.path)
	} else if (aIsUnnamed) {
		return -1
	} else if (bIsUnnamed) {
		return +1
	} else if (aIsLocalModule && bIsLocalModule) {
		return compareLocalModule(a, b)
	} else if (aIsLocalModule) {
		return +1
	} else if (bIsLocalModule) {
		return -1
	} else {
		return compareGlobalModule(a, b)
	}
}

//------------------------------------------------------------------------------
// Writing
//------------------------------------------------------------------------------

const generateNamedImport = (namedImport) => {
	return namedImport.alias ? `${namedImport.importName} as ${namedImport.alias}` : namedImport.importName
}

const generateImportClause = (clause) => {

	let path = `'${clause.path}'`

	if (clause.namespace) {
		return `import * as ${clause.namespace} from ${path}`
	}

	if (clause.default) {

		if (clause.namedImports) {

			let names = clause.namedImports.map(generateNamedImport)

			// maxNamedImportsInSingleLine: 1, multilineIndention: namesAndPath
			if (names.length > 1) {
				return `import ${clause.default}, {\n\t${names.join(',\n\t')}\n\t} from ${path}`
			}

			return `import ${clause.default}, { ${names[0]} } from ${path}`
		}

		return `import ${clause.default} from ${path}`
	}

	if (clause.namedImports) {
		return clause.namedImports.map(namedImport => `import { ${generateNamedImport(namedImport)} } from ${path}`).join('\n')
	}

	return `import ${path}`
}

//------------------------------------------------------------------------------
// Public API
//------------------------------------------------------------------------------

export const sortImportsInSource = (source) => {

	if (/(disable-sort-imports)/.test(source)) {
		return source
	}

	const imports = parseImportNodes(source)
	if (imports.length == 0) {
		return source
	}

	let rest = ''
	let last = 0

	for (let clause of imports) {
		rest += source.slice(last, clause.start)
		last = clause.end
	}

	rest += source.slice(last)

	for (let clause of imports) {
		if (clause.namedImports) {
			clause.namedImports.sort((a, b) => compareModuleName(a.importName, b.importName))
		}
	}

	imports.sort(compareImports)

	return imports.map(generateImportClause).join('\n') + '\n' + rest
}

export default {
	meta: {
		type: 'layout',
		fixable: 'code',
		schema: [],
		messages: {
			unsorted: 'Imports are not sorted.'
		}
	},
	create(context) {
		return {
			Program() {

				const source = context.sourceCode.text
				const sorted = sortImportsInSource(source)

				if (sorted == source) {
					return
				}

				context.report({
					loc: { line: 1, column: 0 },
					messageId: 'unsorted',
					fix: fixer => fixer.replaceTextRange([0, source.length], sorted)
				})
			}
		}
	}
}
