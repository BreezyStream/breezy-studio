import { ApolloLink } from '@apollo/client'
import { Observable } from '@apollo/client'
// aliasLink.ts
import { visit, Kind, type DocumentNode, type FieldNode } from 'graphql';

const DIR_NAME = 'alias';

type RemapPair = { alias: string; original: string };

function deepCopyAliases(value: unknown, pairs: RemapPair[]): unknown {
	if (Array.isArray(value)) {
		return value.map(v => deepCopyAliases(v, pairs));
	}
	if (value && typeof value === 'object') {
		const obj = value as Record<string, unknown>;
		// ensure both keys exist (keep alias; add original if missing)
		for (const { alias, original } of pairs) {
			if (alias in obj && !(original in obj)) {
				obj[original] = obj[alias];
			}
		}
		// recurse
		for (const k of Object.keys(obj)) {
			obj[k] = deepCopyAliases(obj[k], pairs);
		}
		return obj;
	}
	return value;
}

export function createAliasLink(): ApolloLink {
	return new ApolloLink((operation: ApolloLink.Operation, forward: ApolloLink.ForwardFunction) => {
		const pairs: RemapPair[] = [];

		// Rewrite: turn `field @alias(name: "foo")` into `foo: field`, record pairs
		const rewritten: DocumentNode = visit(operation.query, {
			Field(node: FieldNode) {
				const dir = node.directives?.find(d => d.name.value === DIR_NAME);
				if (!dir) return;

				const arg = dir.arguments?.find(a => a.name.value === 'name');
				const aliasName = (arg?.value as any)?.value as string | undefined;
				if (!aliasName) return;

				pairs.push({ alias: aliasName, original: node.name.value });

				return {
					...node,
					alias: { kind: Kind.NAME, value: aliasName },
					directives: node.directives?.filter(d => d !== dir),
				};
			},
		});

		operation.query = rewritten;

		const nextLink = forward?.(operation);
		// if (nextLink == null) {
		// 	return null
		// }

		return new Observable(sub => {
			const subInner = nextLink.subscribe({
				next: result => {
					let patched = result;
					if (patched?.data && pairs.length) {
						// Copy alias -> original across the entire payload
						patched = {
							...patched,
							data: deepCopyAliases(patched.data, pairs) as Record<string, unknown>,
						};
					}

					// (Optional) also remap error paths alias -> original for nicer logs
					if (patched?.errors && pairs.length) {
						const map = new Map(pairs.map(p => [p.alias, p.original]));
						patched = {
							...patched,
							errors: patched.errors.map(e => {
								if (!e.path) return e;
								const path = e.path.map(seg =>
									typeof seg === 'string' && map.has(seg) ? (map.get(seg) as string) : seg
								);
								return { ...e, path };
							}),
						};
					}

					sub.next(patched);
				},
				error: err => sub.error(err),
				complete: () => sub.complete(),
			});
			return () => subInner.unsubscribe();
		});
	});
}
