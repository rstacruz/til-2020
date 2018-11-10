import React from 'react'
import './BlogPostTitle.css'

const BlogPostTitle = ({ title, date }) => {
  return (
    <div className="blog-post-title">
      <h1>{title}</h1>
      <p className="byline">Written by Rico Sta. Cruz / {date}</p>

      <hr />
    </div>
  )
}

export default BlogPostTitle
