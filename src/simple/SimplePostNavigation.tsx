import React from 'react'
import CSS from './SimplePostNavigation.module.css'
import { Link } from 'gatsby'
import { PageNode } from '../types'
import cn from 'classnames'

interface Props {
  previous: PageNode
  next: PageNode
}

const SimplePostNavigation = (props: Props) => {
  const { previous, next } = props

  return (
    <div className={CSS.root}>
      {previous && (
        <Link
          to={previous.fields.slug}
          rel='prev'
          className={cn(CSS.link, CSS.previous)}
        >
          ← <span>{previous.frontmatter.title}</span>
        </Link>
      )}
      {next && (
        <Link
          to={next.fields.slug}
          rel='next'
          className={cn(CSS.link, CSS.next)}
        >
          <span>{next.frontmatter.title}</span> →
        </Link>
      )}
    </div>
  )
}

export default SimplePostNavigation
