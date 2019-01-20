import { Link } from 'gatsby'
import React from 'react'
import { PostTitleSnip } from './PostTitleSnip'
import { PageNode } from '../types'
import CSS from './PostLink.module.css'

export interface Props {
  node: PageNode
}

const PostLink = ({ node }: Props) => {
  const { slug } = node.fields
  const { title, date, tags } = node.frontmatter
  return (
    <article>
      <Link to={slug} className={CSS.link}>
        <PostTitleSnip {...{ slug, title }} />
        <small className={CSS.tags}>{(tags || []).join(' ')}</small>
        <small className={CSS.date}>{date}</small>
      </Link>
    </article>
  )
}

export default PostLink
