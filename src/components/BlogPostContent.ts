/*
 * BlogPostContent
 * ===============
 *
 * Blog post content
 */

import React from 'react'
import PostContent from './PostContent'
import { HastNode } from '../types'
import BlogPostTitle from './BlogPostTitle'
import PostFooter from './PostFooter'
import CSS from './BlogPostContent.module.css'
import cn from 'classnames'

export interface Props {
  body: HastNode[]
  title: string
  date: string | void
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
    <div className={cn(CSS.root)}>
      <BlogPostTitle {...{ title, date, body: titleBody }} />
      <PostContent {...{ body }} />
      <PostFooter {...{ title, date }} />
    </div>
  )
}

export default BlogPostContent
