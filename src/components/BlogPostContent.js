/*
 * BlogPostContent
 * ===============
 *
 * Blog post content
 */

import React from 'react'
import PostContent from './PostContent'
import css from 'styled-jsx/css'

/**
 * Blog post content.
 *
 * @example
 *     <BlogPostContent htmlAst={htmlAst} />
 */

const BlogPostContent = ({ htmlAst }) => {
  return (
    <div className="blog-post-content">
      <PostContent htmlAst={htmlAst} />

      <style jsx>{style}</style>
      <style jsx>{h2SectionStyle}</style>
      <style jsx>{h3SectionStyle}</style>
    </div>
  )
}

/*
 * Styles
 */

const style = css.global`
  @import 'src/styles/variables.css';

  .blog-post-content {
    & {
      @apply --body-font;
      font-size: 16px;
      line-height: 1.6;
      color: var(--text-color);
    }

    & :global(a, a:visited) {
      @apply --em-style;
      color: var(--text-color);
      text-decoration: none;
      white-space: nowrap;
    }

    & :global(a::after) {
      content: '#';
      display: inline-block;
      font-size: 0.8em;
      font-weight: bold;
      width: 14px;
      height: 14px;
      line-height: 14px;
      text-align: center;
      margin: 0 4px;
      border-radius: 50%;
      background: var(--accent);
      color: white;
    }

    & :global(em) {
      @apply --em-style;
    }

    & :global(strong) {
      background: var(--accent);
      font-weight: normal;
    }

    & :global(p, ul, ol, pre, h3) {
      margin-top: 1.5em;
      margin-bottom: 1.5em;
    }

    & :global(h3 + p) {
      margin-top: -1.5em;
    }

    & :global(p) {
      width: 60%;
    }

    & :global(pre) {
      background: white;
      color: #458;
      box-shadow: inset 0 0 0 2px var(--accent);
      /* , 0 16px 24px color-mod(var(--accent) alpha(4%)); */
      margin: 2.5em 0;
      line-height: 1.4;
      padding: 24px;
      border-radius: 4px;
      font-size: 0.86em;
    }

    & :global(code) {
      @apply --code-font;
      padding: 0.2em 0.2em;
      font-size: 0.9em;
      background: var(--code-background);
      background: color-mod(var(--accent));
    }

    & :global(pre code) {
      background: transparent;
      padding: 0;
      font-size: 1em;
    }
  }
`

const h2SectionStyle = css.global`
  @import 'src/styles/variables.css';

  /* body {
    background: linear-gradient(45deg,
      white 20%,
      color-mod(var(--accent) tint(30%)) 20%,
      color-mod(var(--accent) tint(20%) hue(-30deg)) 70%,
      white 70%);
    background-size: 800px 800px;
  } */

  .h2-section {
    & {
      background: white;
      padding-left: calc((100vw - 960px) / 2);
      padding-right: calc((100vw - 960px) / 2);
      padding-top: 64px;
      padding-bottom: 64px;
      margin: 16px;
      /* margin-top: 0;
      margin-bottom: 0; */
      /* border-top: solid 8px var(--accent);
      border-bottom: 0; */
      box-shadow: 0 1px 2px #8883, 0 16px 24px #8881;
    }

    &:first-of-type {
      box-shadow: none;
      background: transparent;
    }

    & + .h2-section {
      margin-top: -14px;
    }

    & > h2 {
      @apply --h2-font;
      @apply --font-size-6;
      color: var(--heading-color);
      margin-bottom: 32px;
      max-width: 50%;
      line-height: 1.3;
      text-shadow: 2px 0 0 color-mod(var(--accent) alpha(40%));
    }

    & > h2.-large {
      @apply --font-size-7;
    }

    & > h1::after,
    & > h2::after {
      margin-top: 32px;
      @apply --horizontal-rule;
    }
  }
`

const h3SectionStyle = css.global`
  @import 'src/styles/variables.css';

  .h3-section {
    & > h3 {
      @apply --h3-font;
      margin-top: 3.5em;
      text-transform: uppercase;
      font-size: 0.95em;
      color: var(--accent-text);
      font-weight: bold;
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

export default BlogPostContent
