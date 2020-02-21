import { Link } from 'gatsby'
import React from 'react'
import { PageNode } from '../types'
import CSS from './PostLink.module.css'
import { PostTitleSnip } from './PostTitleSnip'

export interface Props {
  node: PageNode
}

const PostLink = ({ node }: Props) => {
  const { slug } = node.fields
  const { title, date, tags } = node.frontmatter
  return (
    <article>
      <Link to={slug} className={CSS.link}>
        <small className={CSS.date}>{date || 'Unpublished'}</small>
        <PostTitleSnip {...{ slug, title }} />
        <small className={CSS.tags}>
          {(tags || []).map(tag => (
            <Tag tag={tag} />
          ))}
        </small>
      </Link>
    </article>
  )
}

const Tag = ({ tag }: { tag: string }) => {
  if (tag === 'Featured') {
    return <>★</>
  }

  return (
    <>
      <span>{tag}</span>{' '}
    </>
  )
}

export default PostLink
