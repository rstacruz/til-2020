import { Link } from 'gatsby'
import React from 'react'
import Overdrive from 'react-overdrive'
import style from './MainHeading.scoped.css'
import { PostTitleSnip } from './PostTitleSnip'

export const MainHeading = ({ title, slug }) => {
  return (
    <div className="main-heading">
      <span className="left">
        <Link to="/" className="brand-link" />
      </span>
      <span className="right">
        <span className="prefix">
          <Link to="/" className="home-link">
            TIL
          </Link>
          {' / '}
        </span>
        <PostTitleSnip {...{ slug, title }} />
      </span>

      <style jsx>{style}</style>
    </div>
  )
}
