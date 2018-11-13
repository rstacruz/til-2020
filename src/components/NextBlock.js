/*
 * NextBlock
 * =========
 *
 * The "Next: ..." block at the end of every h2 section.
 */

import React from 'react'
import './NextBlock.css'

const NextBlock = ({ title }) => {
  return (
    <blockquote className='next-block'>
      <strong>Next:</strong> {title}
    </blockquote>
  )
}

export default NextBlock
