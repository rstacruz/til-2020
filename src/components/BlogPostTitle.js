import React from 'react'
import PostContent from './PostContent'
import CardWaypoint from './CardWaypoint'
import './BlogPostTitle.css'
import './BlogPostContent.css'

const BlogPostTitle = ({ title, date, body }) => {
  return (
    <CardWaypoint>
      {({ entered }) => {
        return (
          <div
            className={`blog-post-title ${entered ? '-active' : '-inactive'}`}
          >
            <h1>
              {title} <span className='blinker' />
            </h1>
            <p className='byline'>Written by Rico Sta. Cruz / {date}</p>

            {/* <hr /> */}
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
