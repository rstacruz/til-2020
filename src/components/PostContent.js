import React from 'react'
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

  return toReact(htmlAst)
}

export default PostContent
