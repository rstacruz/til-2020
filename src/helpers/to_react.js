// @flow

import toH from 'hast-to-hyperscript'
import * as React from 'react'

export type Options = {
  components?: ComponentList
}

export type ComponentList = {
  [string]: React.ComponentType<*> | string
}

/**
 * Converts hast to React nodes. This is a reimplementation of `rehype-react`
 * with support for rule sets.
 */

const toReact = ({ components }: Options = {}) => {
  const createElement = (tag: string, props: Object, children: React.Node) => {
    let component

    if (components && components[tag]) {
      component = components[tag]
    }

    return React.createElement(component || tag, props, children)
  }

  const compile = (node: any): React.Node => {
    return toH(createElement, node)
  }

  return compile
}

export default toReact
