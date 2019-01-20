import toH from 'hast-to-hyperscript'
import React from 'react'

export interface Options {
  components?: ComponentList
}

export interface ComponentList {
  [id: string]: React.Component<any, any> | React.SFC<any> | string
}

export interface Propsish {
  'data-element'?: string
  [key: string]: any
}

/**
 * Converts hast to React nodes. This is a reimplementation of `rehype-react`
 * with support for rule sets.
 */

const toReact = ({ components }: Options = {}) => {
  const createElement = (
    tag: string,
    props: Propsish | void,
    children: React.ReactNode
  ) => {
    let component

    if (props && props['data-element']) {
      tag = props['data-element']
    }

    if (components && components[tag]) {
      component = components[tag]
    }

    return React.createElement(component || tag, props || {}, children)
  }

  const compile = (node: any): React.ReactNode => {
    return toH(createElement, node)
  }

  return compile
}

export default toReact
