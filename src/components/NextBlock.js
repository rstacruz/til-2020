/*
 * NextBlock
 * =========
 *
 * The "Next: ..." block at the end of every h2 section.
 */

import React from 'react'
import CSS from './NextBlock.module.css'

const NextBlock = ({ title }) => {
  return (
    <blockquote className={CSS.root}>
      <strong className={CSS.prefix}>Next:</strong> {title}
    </blockquote>
  )
}

export default NextBlock
