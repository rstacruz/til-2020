import { Link } from 'gatsby'
import React from 'react'
import { PostTitleSnip } from './PostTitleSnip'
import './PostLink.css'

const PostLink = ({ node }) => {
  const { slug } = node.fields
  const { title, date } = node.frontmatter
  return (
    <article className="post-link">
      <Link to={slug} class="link">
        <PostTitleSnip {...{ slug, title }} />
        <small className="date">{date}</small>
      </Link>
    </article>
  )
}

export default PostLink
