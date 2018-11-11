/*
 * PostContent
 * ===========
 *
 * Renders a Remark HAST as React nodes.
 *
 * @flow
 */

import * as React from 'react'
import RehypeReact from 'rehype-react'
import NextBlock from './NextBlock'
import H2Section from './H2Section'
import H3Section from './H3Section'
import { type HastNode } from '../types'

export type Props = {
  body: HastNode[],
}

const PostContent = ({ body }: Props): React.Node => {
  const toReact = new RehypeReact({
    createElement: React.createElement,
    components: {
      'next-block': NextBlock,
      'h2-section': H2Section,
      'h3-section': H3Section,
    },
  }).Compiler

  return body.map(toReact)
}

export default PostContent
