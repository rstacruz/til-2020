import React from 'react'
import css from 'styled-jsx/css'

const BlogPostTitle = ({ title, date }) => {
  return (
    <div className="blog-post-title">
      <h1>{title}</h1>
      <p className="byline">Written by Rico Sta. Cruz / {date}</p>

      <hr />

      <style jsx>{style}</style>
    </div>
  )
}

const style = css`
  @import 'src/styles/variables.css';

  .blog-post-title {
    @apply --container-padding;

    & {
      margin: 16px;
    }

    & > h1 {
      @apply --h2-font;
      @apply --font-size-7;
      max-width: 50%;
      text-shadow: 2px 0 0 color-mod(var(--accent) alpha(40%));
      margin: 0;
      padding: 0;
      line-height: 1.2;
      margin-top: 3em;
    }

    & > hr {
      display: block;
      border: 0;
      @apply --horizontal-rule;
      margin: 48px 0;
    }

    & > .byline {
      @apply --h3-font;
      text-transform: uppercase;
      font-weight: bold;
      margin-top: 2em;
      color: var(--accent-text);
      font-size: 0.9em;
    }
  }
`

export default BlogPostTitle
