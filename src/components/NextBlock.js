/*
 * NextBlock
 * =========
 *
 * The "Next: ..." block at the end of every h2 section.
 */

import React from 'react'
import css from 'styled-jsx/css'

const NextBlock = ({ title }) => {
  return (
    <blockquote className="next-block">
      <strong>Next:</strong> {title}
      <style jsx>{style}</style>
    </blockquote>
  )
}

const style = css`
  @import 'src/styles/variables.css';

  .next-block {
    font-style: normal;
    margin: 0;
    color: var(--heading-color);
    font-weight: bold;
    padding-top: 1.5em;
    font-size: 1em;
    font-family: 'Inconsolata', sans-serif;
  }

  .next-block > :global(strong) {
    font-weight: bold;
    text-transform: uppercase;
    padding: 0.2em;
  }

  .next-block::after {
    content: 'v';
    color: var(--accent);
    display: block;
    font-size: 2em;
  }

  .next-block::before {
    @apply --horizontal-rule;
    margin-bottom: 16px;
  }
`

export default NextBlock
