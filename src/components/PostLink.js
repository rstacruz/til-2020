// @flow

import { Link } from 'gatsby'
import React from 'react'
import { PostTitleSnip } from './PostTitleSnip'
import { type PageNode } from '../types'
import './PostLink.css'

export type Props = {
  node: PageNode
}

const PostLink = ({ node }: Props) => {
  const { slug } = node.fields
  const { title, date, tags } = node.frontmatter
  return (
    <article className="post-link">
      <Link to={slug} className="link">
        <PostTitleSnip {...{ slug, title }} />
        <small className="tags">{tags.join(' ')}</small>
        <small className="date">{date}</small>
      </Link>
    </article>
  )
}

export default PostLink
