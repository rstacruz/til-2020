// @flow

import React from 'react'
import { Link } from 'gatsby'
import CSS from './PostPagination.module.css'
import { type PageNode } from '../types'

export type Props = {
  previous: PageNode,
  next: PageNode
}

export const PostPagination = ({ previous, next }: Props) => {
  return (
    <div className={CSS.root}>
      {previous && (
        <Link to={previous.fields.slug} rel='prev' className={CSS.link}>
          ← {previous.frontmatter.title}
        </Link>
      )}
      {next && (
        <Link to={next.fields.slug} rel='next' className={CSS.link}>
          {next.frontmatter.title} →
        </Link>
      )}
    </div>
  )
}
