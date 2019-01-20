import toH from 'hast-to-hyperscript'
import React from 'react'

export type Options = {
  components?: ComponentList
}

export type ComponentList = {
  [id: string]: React.Component<any, any> | React.SFC<any> | string
}

/**
 * Converts hast to React nodes. This is a reimplementation of `rehype-react`
 * with support for rule sets.
 */

const toReact = ({ components }: Options = {}) => {
  const createElement = (
    tag: string,
    props: Object,
    children: React.ReactNode
  ) => {
    let component

    if (components && components[tag]) {
      component = components[tag]
    }

    return React.createElement(component || tag, props, children)
  }

  const compile = (node: any): React.ReactNode => {
    return toH(createElement, node)
  }

  return compile
}

export default toReact
