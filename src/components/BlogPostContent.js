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
import './BlogPostContent.css'
import { type HastNode } from '../types'
import BlogPostTitle from './BlogPostTitle'

export type Props = {
  body: HastNode[],
  title: string,
  date: string,
  titleBody: HastNode[]
}

/**
 * Blog post content.
 *
 * @example
 *     <BlogPostContent htmlAst={htmlAst} />
 */

const BlogPostContent = ({ body, titleBody, title, date }: Props) => {
  return (
    <div className="blog-post-content">
      <BlogPostTitle {...{ title, date, body: titleBody }} />
      <PostContent {...{ body }} />
    </div>
  )
}

export default BlogPostContent
