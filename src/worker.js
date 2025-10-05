//@ts-check
import {getTagNameToDeclaration} from './getTagNameoDeclaration.js';
import {tablify} from './tablify.js';

/** @import  {Package, Module} from '../node_modules/custom-elements-manifest/schema.d.ts' */;

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
const headers = {
  "content-type": "text/html;charset=UTF-8",
  'Access-Control-Allow-Origin': '*',
};
export default {
  /**
   * 
   * @param {Request} request 
   * @param {unknown} env 
   * @param {unknown} ctx 
   * @returns 
   */
  async fetch(request, env, ctx) {
      // You can view your logs in the Observability dashboard
      const url = new URL(request.url);
      const href = url.searchParams.get('href');
      const html = String.raw;
      if (!href) {
          return new Response((await import('./usage.js')).usage, {headers});
      } else {
          const ts = url.searchParams.get('ts') || '';
          /** @type {{package: Package, modules: Module[]} | undefined} */
          let json;
          const resp = await fetch(href);
          if (resp.ok) {
              try {
                  json = await resp.json();
              } catch(e) {
                  return new Response(`Error fetching/parsing JSON from ${href}: ${e}`, {headers});
              }
          } else {
              return new Response(`Error fetching ${href}: ${resp.status} ${resp.statusText}`, {headers});
          }
          const stylesheet = url.searchParams.get('stylesheet') || 'https://cdn.jsdelivr.net/npm/wc-info/simple-ce-style.css';
          const embedded = url.searchParams.get('embedded') === 'true';
          const tags = (url.searchParams.get('tags') || '').split(',').map(t => t.trim()).filter(t => t);
          const processed = getTagNameToDeclaration(json);
          let declarations = processed?.declarations || [];
          if(embedded){
                return new Response(html`
                  ${declarations.map(declaration => html`
                    <h1 id="${/** @type {any} */(declaration).tagName}">${/** @type {any} */(declaration).tagName}</h1>
                    ${tablify(/** @type {any} */(declaration).members.filter(x => (x.kind === 'field') && (x.privacy !== 'private')) , 'Properties', 'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json#definitions/ClassField', mobile, ['kind'])}
                    ${tablify(/** @type {any} */(declaration).attributes, 'Attributes', 'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json#definitions/Attribute', mobile)}
                    ${tablify(/** @type {any} */(declaration).cssProperties, 'CSS Properties', 'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json#definitions/CssCustomProperty', false)}
                    ${tablify(/** @type {any} */(declaration).cssParts, 'CSS Parts', 'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json#definitions/CssPart', false)}
                    ${tablify(/** @type {any} */(declaration).slots, 'Slots', 'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json#definitions/Slot', false)}
                    ${tablify(/** @type {any} */(declaration).events, 'Events', 'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json#definitions/Event', false)}
                    ${tablify(/** @type {any} */(declaration).members.filter((x) => (x.kind === 'method') && (x.privacy !== 'private')) , 'Methods', 'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json#definitions/Method', mobile, ['kind'])}
                `).join('')}
              `, {
              headers
            });
          }
          return new Response(JSON.stringify(json));
      }

  }
};