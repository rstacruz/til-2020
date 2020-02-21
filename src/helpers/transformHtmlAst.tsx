import decorate from 'rehype-decorate'
import sectionize from 'rehype-sectionize-headings'
import { HastNode } from '../types'

function transformHtmlAst(ast: HastNode): HastNode {
  ast = decorate(ast)
  ast = sectionize(ast, {
    h2: {
      bodyClass: [],
      bodyTag: 'h2-body',
      sectionClass: [],
      sectionTag: 'h2-section'
    },
    h3: {
      bodyClass: [],
      bodyTag: 'h3-body',
      sectionClass: [],
      sectionTag: 'h3-section'
    }
  })
  return ast
}

export default transformHtmlAst
