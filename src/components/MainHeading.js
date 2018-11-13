import { Link } from 'gatsby'
import React from 'react'
import './MainHeading.css'
import { PostTitleSnip } from './PostTitleSnip'

export const MainHeading = ({ title, slug }) => {
  return (
    <div className="main-heading">
      <div className="left">
        <Link to="/" className="brandlink" />
      </div>
      <div className="right">
        <span className="line" />
        <br />
        <PostTitleSnip {...{ slug, title }} variant="-small" />
      </div>
    </div>
  )
}
