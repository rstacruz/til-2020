import React from 'react'
import PostContent from './PostContent'
import CardWaypoint from './CardWaypoint'
import CSS from './BlogPostTitle.module.css'
import cn from 'classnames'

const BlogPostTitle = ({ title, date, body }) => {
  return (
    <CardWaypoint>
      {({ entered }) => {
        return (
          <div
            className={cn(CSS.root, entered ? CSS.isActive : CSS.isInactive)}
          >
            <div className={CSS.titleContainer}>
              <h1 className={CSS.title}>
                <span>{title}</span>
                <span className={CSS.blinker} />
              </h1>
            </div>

            <p className={CSS.byline}>Written by Rico Sta. Cruz / {date}</p>

            <div className={CSS.body}>
              <PostContent body={body} />
            </div>
          </div>
        )
      }}
    </CardWaypoint>
  )
}

export default BlogPostTitle
