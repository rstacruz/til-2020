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
    </div>
  )
}

/*
 * Styles
 */

const style = css`
  :root {
    --text-color: #303030;
    --heading-color: #080808;
    --border-color: #7080903c;
    --code-background: #fcfcfc;
    --accent: #ffeaa7;
    --accent2: #fdcb6e;

    --horizontal-rule: {
      content: '';
      display: block;
      height: 2px;
      background: linear-gradient(to right, var(--accent) 20%, transparent 20%);
    }

    --h2-font: {
      font-weight: normal;
      font-family: 'Alegreya', serif;
      font-style: normal;
    }

    --h3-font: {
      font-weight: normal;
      font-family: 'Alegreya', sans-serif;
      font-style: italic;
    }

    --code-font: {
      font-family: cousine, monospace;
      letter-spacing: -0.04em;
    }

    --em-style: {
      font-family: 'Alegreya', sans-serif;
      font-size: 1.15em;
      line-height: 0.2em;
      font-style: italic;
    }
  }

  .blog-post-content {
    font-size: 16px;
    line-height: 1.6;
    color: var(--text-color);
    font-family: 'Roboto', sans-serif;
  }

  .blog-post-content {
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

    & :global(blockquote:last-child) {
      font-style: normal;
      margin: 0;
      color: #666;
      padding-top: 1.5em;
      font-size: 1em;
      font-family: 'Inconsolata', sans-serif;
    }

    & :global(blockquote:last-child::after) {
      content: 'v';
      color: var(--accent);
      display: block;
      font-size: 2em;
    }

    & :global(blockquote:last-child::before) {
      @apply --horizontal-rule;
      margin-bottom: 16px;
    }

    & :global(.h2-section) {
      border: solid 2px var(--border-color);
      padding-left: calc((100vw - 960px) / 2);
      padding-right: calc((100vw - 960px) / 2);
      padding-top: 64px;
      padding-bottom: 64px;
      margin: 32px;
      margin-top: 0;
      margin-bottom: 0;
    }

    & :global(.h2-section:not(:last-child)) {
      margin-top: -2px;
      border-top: 0;
      margin-bottom: 0;
    }

    & :global(.h2-section > h1),
    & :global(.h2-section > h2) {
      font-size: calc(1.2em * 1.2 * 1.2 * 1.2); /* TODO modular-scale */
      @apply --h2-font;
      color: var(--heading-color);
      margin-bottom: 1em;
    }

    & :global(.h2-section > h2.-large) {
      font-size: calc(
        1.2em * 1.2 * 1.2 * 1.2 * 1.2 * 1.2
      ); /* TODO modular-scale */
    }

    & :global(.h3-section > h3) {
      @apply --h3-font;
      margin-top: 3.5em;
      text-transform: uppercase;
      font-size: 0.95em;
      color: var(--accent2);
      font-family: 'Fira Mono';
      letter-spacing: 0.05em;
      font-weight: bold;
      font-style: normal;
      margin-bottom: 0.3em;
    }

    & :global(.h3-section > .body),
    & :global(.h3-section > .body > :first-child) {
      margin-top: 0;
    }

    & :global(.h2-section > h1::after),
    & :global(.h2-section > h2::after) {
      margin-top: 16px;
      @apply --horizontal-rule;
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
      background: #fefefe;
      color: #456;
      box-shadow: inset 0 0 0 2px var(--accent), 0 16px 24px #f8f8aa0a;
      margin: 2.5em 0;
      line-height: 1.4;
      padding: 24px;
      border-radius: 4px;
      font-size: 0.86em;
    }

    & :global(code) {
      @apply --code-font;
      padding: 0.2em 0.5em;
      font-size: 0.9em;
      background: var(--code-background);
    }

    & :global(pre code) {
      background: transparent;
      padding: 0;
      font-size: 1em;
    }
  }
`
export default BlogPostContent
