/*
 * BlogPostContent
 * ===============
 *
 * Blog post content
 *
 * @flow
 */

import React from 'react'
import PostContent from './PostContent'
import Overdrive from 'react-overdrive'
import './BlogPostContent.css'
import { type HastNode } from '../types'

export type Props = {
  body: HastNode[],
}

/**
 * Blog post content.
 *
 * @example
 *     <BlogPostContent htmlAst={htmlAst} />
 */

const BlogPostContent = ({ body }: Props) => {
  return (
    <div className="blog-post-content">
      <PostContent {...{ body }} />
    </div>
  )
}

export default BlogPostContent
