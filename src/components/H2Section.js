import React from 'react'
import css from 'styled-jsx/css'

const H2Section = ({ children, className }) => (
  <section className={className}>
    {children}
    <style jsx>{style2}</style>
  </section>
)

const style2 = css.global`
  @import 'src/styles/variables.css';

  .h2-section {
    & {
      @apply --container-padding;
      background: white;
      padding-top: 96px;
      padding-bottom: 96px;
      position: relative;
    }

    &:not(:first-of-type) {
      border-top: solid 32px color-mod(var(--accent) alpha(20%));
    }

    &:first-of-type {
      box-shadow: none;
      background: transparent;
      padding-top: 0;
    }

    & + .h2-section {
      margin-top: -14px;
    }

    & > h2 {
      @apply --h2-font;
      @apply --font-size-4;
      color: var(--heading-color);
      margin-bottom: 32px;
      line-height: 1.4;
      text-shadow: 2px 0 0 color-mod(var(--accent) alpha(40%));
      max-width: var(--column-size);
    }

    & > h2.-large {
      @apply --font-size-7;
    }

    & > h1::after,
    & > h2::after {
      margin-top: 16px;
      @apply --horizontal-rule;
    }
  }
`

export default H2Section
