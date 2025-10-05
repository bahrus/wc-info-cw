/**
 * 
 * @param {string} str 
 * @returns {string}
 */
export function sanitize(str){
  if(!str) return '';
  if(typeof str !== 'string') return str;
  return str.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}