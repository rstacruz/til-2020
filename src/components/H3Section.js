import React from 'react'
import css from 'styled-jsx/css'

const H3Section = ({ children, className }) => (
  <section className={className}>
    {children}
    <style jsx>{style}</style>
  </section>
)

const style = css.global`
  @import 'src/styles/variables.css';

  .h3-section {
    & {
      /* This is where it gets funny */
      max-width: var(--column-size);
    }

    & > h3 {
      @apply --h3-font;
      margin-top: 3.5em;
      text-transform: uppercase;
      font-size: 0.95em;
      color: var(--accent-text);
      margin-bottom: 0.3em;
    }

    & > h3:empty {
      display: none;
    }

    & > .body,
    & > .body > :first-child {
      margin-top: 0;
    }
  }
`

export default H3Section
