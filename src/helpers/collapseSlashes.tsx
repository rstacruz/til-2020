/**
 * @example
 *     collapseSlashes('https://a/b//c/d')
 *     // => 'https://a/b/c/d'
 */
export function collapseSlashes(str: string) {
  return str.replace(/([^:])\/\/+/g, '$1/')
}
