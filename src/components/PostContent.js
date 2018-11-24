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
import makeToReact from '../helpers/to_react'

export type Props = {
  body: HastNode[]
}

const toReact = makeToReact({
  components: {
    'next-block': NextBlock,
    'h2-section': H2Section,
    'h3-section': H3Section
  },
  rules: [
    {
      match: (_tag, props) => props && props.className === 'body',
      component: function Body({ children, ...props }) {
        return <div {...props}>{children}</div>
      }
    }
  ]
})

const PostContent = ({ body }: Props): React.Node => {
  return body.map((ast, index) => {
    return <React.Fragment key={index}>{toReact(ast)}</React.Fragment>
  })
}

export default PostContent
