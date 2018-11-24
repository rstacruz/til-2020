import { Link } from 'gatsby'
import React from 'react'
import CSS from './MainHeading.module.css'
import { PostTitleSnip } from './PostTitleSnip'

export const MainHeading = ({ title, slug }) => {
  return (
    <div className={CSS.root}>
      <div className={CSS.left}>
        <Link to='/' className={CSS.brandlink} />
      </div>
      <div className={CSS.right}>
        <span className={CSS.line} />
        <br />
        <PostTitleSnip {...{ slug, title }} variant='-small' />
      </div>
    </div>
  )
}
