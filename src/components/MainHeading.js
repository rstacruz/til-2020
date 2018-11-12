import { Link } from 'gatsby'
import React from 'react'
import Overdrive from 'react-overdrive'
import './MainHeading.css'
import { PostTitleSnip } from './PostTitleSnip'

export const MainHeading = ({ title, slug }) => {
  return (
    <div className="main-heading">
      <span className="left">
        <Link to="/" className="brandlink" />
      </span>
      <span className="right">
        <span className="prefix">
          <Link to="/" className="homelink">
            TIL
          </Link>
          {' / '}
        </span>
        <PostTitleSnip {...{ slug, title }} variant="-small" />
      </span>
    </div>
  )
}
