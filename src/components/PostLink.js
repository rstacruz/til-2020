import { Link } from 'gatsby'
import React from 'react'
import style from './PostLink.scoped.css'
import { PostTitleSnip } from './PostTitleSnip'

const PostLink = ({ node }) => {
  const { slug } = node.fields
  const { title, date } = node.frontmatter
  return (
    <article className="post-link">
      <Link to={slug} class="link">
        <PostTitleSnip {...{ slug, title }} />
        <small className="date">{date}</small>
      </Link>
      <style jsx>{style}</style>
    </article>
  )
}

export default PostLink
