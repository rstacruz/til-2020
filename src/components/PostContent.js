import React from 'react'
import decorate from 'rehype-decorate'
import sectionize from 'rehype-sectionize-headings'
import RehypeReact from 'rehype-react'
import NextBlock from './NextBlock'
import H2Section from './H2Section'
import H3Section from './H3Section'

const PostContent = ({ htmlAst }) => {
  const toReact = new RehypeReact({
    createElement: React.createElement,
    components: {
      'next-block': NextBlock,
      'h2-section': H2Section,
      'h3-section': H3Section,
    },
  }).Compiler

  let ast = htmlAst
  ast = decorate(ast)
  ast = sectionize(ast, {
    h2: { sectionTag: 'h2-section' },
    h3: { sectionTag: 'h3-section' },
  })
  return toReact(ast)
}

export default PostContent
