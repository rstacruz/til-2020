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
import H2Body from './H2Body'
import H3Body from './H3Body'

export type Props = {
  body: HastNode[]
}

const toReact = makeToReact({
  components: {
    'next-block': NextBlock,
    'h2-section': H2Section,
    'h3-section': H3Section,
    'h2-body': H2Body,
    'h3-body': H3Body
  }
})

const PostContent = ({ body }: Props): React.Node => {
  return body.map((ast, index) => {
    return <React.Fragment key={index}>{toReact(ast)}</React.Fragment>
  })
}

export default PostContent
