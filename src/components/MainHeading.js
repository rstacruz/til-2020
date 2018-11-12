import { Link } from 'gatsby'
import React from 'react'
import Overdrive from 'react-overdrive'
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
        {'This is '}
        <Link to="/">Today I learned</Link>, a collection of things I've learned
        in my day-to-day web development work. You're reading{' '}
        <PostTitleSnip {...{ slug, title }} variant="-small" />.
      </div>
    </div>
  )
}
