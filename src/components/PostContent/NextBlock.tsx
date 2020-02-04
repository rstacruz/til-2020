/*
 * NextBlock
 * =========
 *
 * The "Next: ..." block at the end of every h2 section.
 */

import React from 'react'
import CSS from './NextBlock.module.css'

interface Props {
  title: string
}

const NextBlock = ({ title }: Props) => {
  return (
    <blockquote className={CSS.root}>
      <strong>Next:</strong> {title}
    </blockquote>
  )
}

export default NextBlock
