import React from 'react'
import decorate from 'rehype-decorate'
import sectionize from 'rehype-sectionize-headings'
import RehypeReact from 'rehype-react'

const PostContent = ({ htmlAst }) => {
  const toReact = new RehypeReact({
    createElement: React.createElement,
    components: {
      'next-block': ({ children }) => <blockquote>LOL {children}</blockquote>,
    },
  }).Compiler

  let ast = htmlAst
  ast = decorate(ast)
  ast = sectionize(ast)
  return toReact(ast)
}

export default PostContent
