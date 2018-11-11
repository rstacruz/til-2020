import { Link } from 'gatsby'
import React from 'react'
import './PostLink.css'
import { PostTitleSnip } from './PostTitleSnip'

const PostLink = ({ node }) => {
  const { slug } = node.fields
  const { title, date } = node.frontmatter
  return (
    <article className="post-link">
      <Link to={slug}>
        <PostTitleSnip {...{ slug, title }} />
        <small className="date">{date}</small>
      </Link>
    </article>
  )
}

export default PostLink
