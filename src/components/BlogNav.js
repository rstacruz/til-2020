import React from 'react'
import { Link } from 'gatsby'

export const BlogNav = ({ title, slug }) => {
  import('./BlogNav.css')
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
