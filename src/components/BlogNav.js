import React from 'react'
import './BlogNav.css'

export const BlogNav = ({ title }) => {
  return (
    <div className="blog-nav">
      <div className="area">
        <div className="bar">
          <strong>TIL</strong>
          <span>{title}</span>
        </div>
      </div>
    </div>
  )
}
