//@ts-check

/** @import  {
 *      Package, Module, CustomElementDeclaration, CustomElement, Declaration, 
*          ClassDeclaration, ClassField, ClassMethod
* } from '../node_modules/custom-elements-manifest/schema.d.ts' */;

/**
 * 
 * @param {any} fetchResult 
 * @returns 
 */
export function getTagNameToDeclaration(fetchResult){
    /**
     * @type {{[key: string]: CustomElementDeclaration}}
     */
  const tagNameToDeclaration = {};
  const pack = /** @type {Package} */ (fetchResult);
  if(pack === undefined) return;
  const mods = pack.modules;
  if(mods === undefined) return;
  console.log(typeof mods);
  for(const mod of mods){
      const declarations = mod.declarations;
      if(declarations === undefined) continue;
      const tagDeclarations = declarations.filter(x => (/** @type {CustomElement} */ (x)).tagName !== undefined);
      
      for(const declaration of tagDeclarations){
          const ce = /** @type {CustomElementDeclaration} */ (declaration);
          
          const tagName = (/** @type {CustomElement} */ (declaration)).tagName;
          if(tagName === undefined) continue;
          if(tagNameToDeclaration[tagName] !== undefined){
              if(countTypes(declaration) >  countTypes(/** @type {Declaration} */ (tagNameToDeclaration[tagName]))){
                  tagNameToDeclaration[tagName] = ce;
              }
          }else{
              tagNameToDeclaration[tagName] = ce;
          }
          (/** @type {any} */ (ce)).unevaluatedNonStaticPublicFields = getUnevaluatedNonStaticPublicFieldsFromDeclaration(ce);
          (/** @type {any} */ (ce)).methods = getMethodsFromDeclaration(ce);
      }

  }
  const declarations = /** @type {Declaration[]} */ (Object.values(tagNameToDeclaration));
  return {tagNameToDeclaration, declarations};  
}

/**
 * 
 * @param {Declaration} declaration 
 * @returns 
 */
function countTypes(declaration){
  let count = 0;
  if(declaration.kind !== 'class') return count;
  const classDeclaration = /** @type {ClassDeclaration} */ (declaration);
  if(classDeclaration.members === undefined) return count;
  for(const member of classDeclaration.members){
      const classField = /** @type {ClassField} */ (member);
      if(classField.type !== undefined) count++;
  }
  return count;
}

/**
 * 
 * @param {CustomElementDeclaration} ce 
 * @returns 
 */
function getUnevaluatedNonStaticPublicFieldsFromDeclaration(ce){
  if(ce === undefined || ce.members === undefined) return [];
  return /** @type {ClassField[]} */ (ce.members.filter(x=> x.kind ==='field' && !x.static && !(x.privacy==='private')));
}

/**
 * 
 * @param {CustomElementDeclaration} ce 
 * @returns 
 */
function getMethodsFromDeclaration(ce){
  if(ce === undefined || ce.members === undefined) return [];
  return /** @type {ClassMethod[]} */ (ce.members.filter(x => x.kind === 'method'));
}