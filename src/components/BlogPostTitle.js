import React from 'react'
import PostContent from './PostContent'
import './BlogPostTitle.css'
import './BlogPostContent.css'

const BlogPostTitle = ({ title, date, body }) => {
  return (
    <div className="blog-post-title">
      <h1>
        {title} <span className="blinker" />
      </h1>
      <p className="byline">Written by Rico Sta. Cruz / {date}</p>

      {/* <hr /> */}
      <div className="MarkdownBody">
        <PostContent body={body} />
      </div>
    </div>
  )
}

export default BlogPostTitle
