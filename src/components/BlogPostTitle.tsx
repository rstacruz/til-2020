import cn from 'classnames'
import React from 'react'
import CSS from './BlogPostTitle.module.css'
import CardWaypoint from './CardWaypoint'
import PostContent from './PostContent'

interface Props {
  title: string
  date: string | void
  body: any
}

const BlogPostTitle = ({ title, date, body }: Props) => {
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
                {/* I don't like how it looks now, plus it wraps weird */}
                {/* <span className={CSS.blinker} /> */}
              </h1>
            </div>

            <p className={CSS.byline}>
              <span>Written by Rico Sta. Cruz</span>
              {date ? <span> / {date}</span> : null}
            </p>

            <div className={CSS.body}>{PostContent({ body })}</div>
          </div>
        )
      }}
    </CardWaypoint>
  )
}

export default BlogPostTitle
