import toH from 'hast-to-hyperscript'
import * as React from 'react'

const toReact = ({ components, rules }, ast) => {
  const createElement = (tag: string, props: {}, children: React.Node) => {
    let newTag
    if (components[tag]) {
      newTag = components[tag]
    } else if (rules && rules.length) {
      newTag = rules.reduce(
        (result, { match, component }) =>
          result || (match(tag, props, children) && component),
        null
      )
    }
    return React.createElement(newTag || tag, props, children)
  }
  return toH(createElement, ast)
}

export default toReact
