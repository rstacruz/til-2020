/*
 * NextBlock
 * =========
 *
 * The "Next: ..." block at the end of every h2 section.
 */

import React from 'react'
import style from './NextBlock.scoped.css'

const NextBlock = ({ title }) => {
  return (
    <blockquote className="next-block">
      <strong>Next:</strong> {title}
      <style jsx>{style}</style>
    </blockquote>
  )
}

export default NextBlock
