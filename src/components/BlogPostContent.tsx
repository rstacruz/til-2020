/*
 * BlogPostContent
 * ===============
 *
 * Blog post content
 */

import cn from 'classnames'
import React from 'react'
import { HastNode } from '../types'
import CSS from './BlogPostContent.module.css'
import BlogPostTitle from './BlogPostTitle'
import PostContent from './PostContent'
import PostFooter from './PostFooter'

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

const BlogPostContent = (props: Props) => {
  const { body, titleBody, title, date } = props

  return (
    <div className={cn(CSS.root)}>
      <BlogPostTitle {...{ title, date, body: titleBody }} />
      {PostContent({ body })}
      <PostFooter {...{ title, date }} />
    </div>
  )
}

export default BlogPostContent
