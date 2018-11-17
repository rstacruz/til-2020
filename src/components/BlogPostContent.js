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
import { type HastNode } from '../types'
import BlogPostTitle from './BlogPostTitle'
import PostFooter from './PostFooter'
import './BlogPostContent.css'
import './MarkdownBody.css'

export type Props = {
  body: HastNode[],
  title: string,
  date: ?string,
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
    <div className='blog-post-content MarkdownBody'>
      <BlogPostTitle {...{ title, date, body: titleBody }} />
      <PostContent {...{ body }} />
      <PostFooter {...{ title, date }} />
    </div>
  )
}

export default BlogPostContent
