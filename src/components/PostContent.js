/*
 * PostContent
 * ===========
 *
 * Renders a Remark HAST as React nodes.
 *
 * @flow
 */

import * as React from 'react'
import NextBlock from './NextBlock'
import H2Section from './H2Section'
import H3Section from './H3Section'
import { type HastNode } from '../types'
import toReact from '../helpers/to_react'

export type Props = {
  body: HastNode[]
}

const toReactOpts = {
  components: {
    'next-block': NextBlock,
    'h2-section': H2Section,
    'h3-section': H3Section
  },
  rules: [
    {
      match: (_tag, props, _) => props.className === 'body',
      component: 'div'
    }
  ]
})

const PostContent = ({ body }: Props): React.Node => {
  return body.map((ast, index) => {
    return <React.Fragment key={index}>{toReact(toReactOpts, ast)}</React.Fragment>
  })
}

export default PostContent
