import { Link } from 'gatsby'
import React from 'react'
import { PageNode } from '../types'
import CSS from './PostPagination.module.css'

export interface Props {
  previous: PageNode
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
