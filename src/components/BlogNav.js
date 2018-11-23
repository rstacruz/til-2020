import React from 'react'
import CSS from './BlogNav.module.css'

export const BlogNav = ({ title }) => {
  return (
    <div className={CSS.root}>
      <div className={CSS.area}>
        <div className={CSS.bar}>
          <strong className={CSS.prefix}>TIL</strong>
          <span className={CSS.title}>{title}</span>
        </div>
      </div>
    </div>
  )
}
