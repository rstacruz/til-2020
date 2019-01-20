/*
 * PostContent
 * ===========
 *
 * Renders a Remark HAST as React nodes.
 *
 * @flow
 */

import * as React from 'react'
import makeToReact from '../helpers/to_react'
import { HastNode } from '../types'
import H2Body from './H2Body'
import H2Section from './H2Section'
import H3Body from './H3Body'
import H3Section from './H3Section'
import MultiComparison from './MultiComparison'
import NextBlock from './NextBlock'
import PreCode from './PreCode'

export interface Props {
  body: HastNode[]
}

const toReact = makeToReact({
  components: {
    'h2-body': H2Body,
    'h2-section': H2Section,
    'h3-body': H3Body,
    'h3-section': H3Section,
    'multi-comparison': MultiComparison,
    'next-block': NextBlock,
    pre: PreCode
  }
})

const PostContent = ({ body }: Props): JSX.Element[] => {
  return body.map((ast, index) => {
    return <React.Fragment key={index}>{toReact(ast)}</React.Fragment>
  })
}

export default PostContent
