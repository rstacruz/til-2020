import React from 'react'
import decorate from 'rehype-decorate'
import RehypeReact from 'rehype-react'

const PostContent = ({ htmlAst }) => {
  const toReact = new RehypeReact({
    createElement: React.createElement,
  }).Compiler

  let ast = htmlAst
  ast = decorate(ast)
  return toReact(ast)
}

export default PostContent
