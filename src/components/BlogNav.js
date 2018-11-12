import React from 'react'
import { Link } from 'gatsby'
import './BlogNav.css'

export const BlogNav = ({ title, slug }) => {
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
