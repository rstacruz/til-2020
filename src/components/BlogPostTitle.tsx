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
    <div className={CSS.root}>
      <div>
        <h1 className={CSS.title}>{title}</h1>
      </div>

      <p className={CSS.byline}>
        <span className={CSS.author}>by Rico Sta. Cruz</span>
        {date ? <span className={CSS.date}>{date}</span> : null}
      </p>

      <div className={CSS.body}>{PostContent({ body })}</div>
    </div>
  )
}

export default BlogPostTitle
