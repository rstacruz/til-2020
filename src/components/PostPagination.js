import React from 'react'
import { Link } from 'gatsby'
import './PostPagination.css'

export const PostPagination = ({ previous, next }) => {
  return (
    <div className='post-pagination'>
      {previous && (
        <Link to={previous.fields.slug} rel='prev'>
          ← {previous.frontmatter.title}
        </Link>
      )}
      {next && (
        <Link to={next.fields.slug} rel='next'>
          {next.frontmatter.title} →
        </Link>
      )}
    </div>
  )
}
