import { Link } from 'gatsby'
import React from 'react'
import Overdrive from 'react-overdrive'
import './MainHeading.css'
import { PostTitleSnip } from './PostTitleSnip'

export const MainHeading = ({ title, slug }) => {
  return (
    <div className="main-heading">
      <Link to="/">TIL</Link>
      {' / '}
      <PostTitleSnip {...{ slug, title }} />
    </div>
  )
}
