import React from 'react'
import PostContent from './PostContent'

const BlogPostContent = ({ htmlAst }) => {
  return (
    <div className="blog-post-content">
      <PostContent htmlAst={htmlAst} />

      <style jsx>{`
        .h2-section {
          border: solid 1px red;
        }
      `}</style>
    </div>
  )
}

export default BlogPostContent
