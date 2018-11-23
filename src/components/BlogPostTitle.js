import React from 'react'
import PostContent from './PostContent'
import CardWaypoint from './CardWaypoint'
import CSS from './BlogPostTitle.module.css'
import './MarkdownBody.css'
import cn from 'classnames'

const BlogPostTitle = ({ title, date, body }) => {
  return (
    <CardWaypoint>
      {({ entered }) => {
        return (
          <div
            className={cn(CSS.root, entered ? CSS.isActive : CSS.isInactive)}
          >
            <h1 className={CSS.title}>
              {title} <span className={CSS.blinker} />
            </h1>

            <p className={CSS.byline}>Written by Rico Sta. Cruz / {date}</p>

            <div className='MarkdownBody'>
              <PostContent body={body} />
            </div>
          </div>
        )
      }}
    </CardWaypoint>
  )
}

export default BlogPostTitle
