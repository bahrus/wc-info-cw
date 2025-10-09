//@ts-check

import { tablify } from './tablify.js';
import { marked } from 'marked';

/** @import  {
 *      Package, Module, CustomElementDeclaration, CustomElement, Declaration,
 *          ClassDeclaration, ClassField, ClassMethod
 * } from '../node_modules/custom-elements-manifest/schema.d.ts' */ const html = String.raw;

/**
 *
 * @param {Declaration} declaration
 * @param {number} idx
 * @param {boolean} mobile
 * @returns
 */
export function createDeclaration(declaration, idx, mobile) {
	if (idx < 3000000) {
		return createSection(declaration, mobile);
	}
	return html` <template id="${/** @type {any} */ (declaration).tagName}" be-lazy> ${createSection(declaration, mobile)} </template> `;
}

/**
 *
 * @param {Declaration} declaration
 * @param {boolean} mobile
 * @returns
 */
function createSection(declaration, mobile) {
	const description = marked.parse(declaration?.description ?? '');
	const summary = marked.parse(declaration.summary ?? '');
	return html`
		<section itemscope id="${/** @type {any} */ (declaration).tagName}">
			<hgroup>
				<h1 itemprop="tagName">${/** @type {any} */ (declaration).tagName}</h1>
				<h2 itemprop="description">${description}</h2>
				<h3 itemprop="summary">${summary}</h3>
			</hgroup>
			${!/** @type {any} */ (declaration)?.members
				? ''
				: tablify(
						/** @type {any} */ (declaration).members.filter(/** @param x {any} */ (x) => x.kind === 'field' && x.privacy !== 'private'),
						'Properties',
						'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json#definitions/ClassField',
						mobile,
						['kind'],
					)}
			${tablify(
				/** @type {any} */ (declaration).attributes,
				'Attributes',
				'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json#definitions/Attribute',
				mobile,
			)}
			${tablify(
				/** @type {any} */ (declaration).cssProperties,
				'CSS Properties',
				'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json#definitions/CssCustomProperty',
				false,
			)}
			${tablify(
				/** @type {any} */ (declaration).cssParts,
				'CSS Parts',
				'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json#definitions/CssPart',
				false,
			)}
			${tablify(
				/** @type {any} */ (declaration).slots,
				'Slots',
				'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json#definitions/Slot',
				false,
			)}
			${tablify(
				/** @type {any} */ (declaration).events,
				'Events',
				'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json#definitions/Event',
				false,
			)}
			${!/** @type {any} */ (declaration)?.members
				? ''
				: tablify(
						/** @type {any} */ (declaration).members.filter(/** @param x {any} */ (x) => x.kind === 'method' && x.privacy !== 'private'),
						'Methods',
						'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json#definitions/Method',
						mobile,
						['kind'],
					)}
		</section>
	`;
}
