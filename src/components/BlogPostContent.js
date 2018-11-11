/*
 * BlogPostContent
 * ===============
 *
 * Blog post content
 */

import React from 'react'
import PostContent from './PostContent'
import Overdrive from 'react-overdrive'
import './BlogPostContent.css'

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
    </div>
  )
}

export default BlogPostContent
