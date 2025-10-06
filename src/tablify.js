//@ts-check

import {sanitize} from './sanitize.js';

const html = String.raw;
/**
 * 
 * @param {any[]} obj 
 * @param {string} name 
 * @param {string} itemType 
 * @param {boolean} separateLineForDescription 
 * @param {string[]} exclude 
 * @returns {string}
 */
export function tablify(obj, name, itemType, separateLineForDescription, exclude = []){
  //console.log('tablifying ' + name);
  if(obj === undefined || obj.length === 0) return '';
  const compactedName = name.replaceAll(' ', '-').toLowerCase();
  const keys = getKeys(obj).filter(x => !exclude.includes(x));
  /** @type {string | undefined} */
  let header, rows;
  if(separateLineForDescription){
    header = keys.filter(x => x !== 'description').map(x => html`<th part="${compactedName}-${x}-header" class="${x}">${x}</th>`).join('');
    /** @type {string[]} */
    const rowsArr = [];
    for(const item of obj){
      const row1 = html`<tr itemscope itemtype="${itemType}">${keys.filter(x => x !== 'description').map(key => displayCell(key, item, compactedName)).join('')}</tr>`;
      const row2 = html`<tr itemscope itemtype="${itemType}">${displayCell('description', item, compactedName, `colspan="${keys.length - 1}"`)}</tr>`;
      rowsArr.push(row1 + row2);
    }
    rows = rowsArr.join('');
  }else{
    header = keys.map(x => html`<th part="${compactedName}-${x}-header" class="${x}">${x}</th>`).join('');
    rows = obj.map(x => html`<tr itemscope itemtype="${itemType}">${keys.map(key => displayCell(key, x, compactedName)).join('')}</tr>`).join('');
  }
  return html`
  <table  part="table table-${compactedName}" class=${compactedName}>
    <caption class="title">${name}</caption>
    <thead >
      <tr>
    ${header}
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>`;
}

/**
 * 
 * @param {any[]} obj 
 * @returns 
 */
function getKeys(obj){
/** @type {{[key: string]: number}} */
  const keyCounts  = {};
  for(const item of obj){
    for(const key of Object.keys(item)){
      if(keyCounts[key] === undefined) keyCounts[key] = 0;
      keyCounts[key]++;
    }
  }
  if(keyCounts['name'] !== undefined){
    keyCounts['name']++;
  }
  return Object.keys(keyCounts).sort((a,b) => keyCounts[b] - keyCounts[a]);

}

/**
 * 
 * @param {string} key 
 * @param {any} x 
 * @param {string} compactedName 
 * @param {string} colspan 
 * @returns 
 */
function displayCell(key, x, compactedName, colspan = ''){
  const val = x[key];
  const attrs =  `${colspan} itemprop="${key}" part="cell ${compactedName}-${key}-cell" class="${key}"`;
  const descriptionTitle = (key === 'description' && colspan !== '') ? '<strong>Description: </strong>' : '';

  if(val === undefined) return html`<td ${attrs}> - </td>`;
  if(typeof(val) === 'object'){
    if(Array.isArray(val) && key){
      return html`<td ${attrs}>${tablify(val, key, 'https://cdn.jsdelivr.net/npm/custom-elements-manifest@1.0.0/schema.json', false)}</td>`;
    }else{
      return html`<td ${attrs} data-is-json>
        <details>
          <summary></summary>
          ${JSON.stringify(val, null, 2)}
        </details>
      </td>`;
    }
    
  }else{
    return html`<td ${attrs}>${descriptionTitle}${sanitize(val)}</td>`
  }
}