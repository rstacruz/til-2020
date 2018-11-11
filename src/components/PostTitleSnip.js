import Overdrive from 'react-overdrive'
import React from 'react'
import style from './PostTitleSnip.scoped.css'

export const PostTitleSnip = ({ slug, title }) => {
  return (
    <span className="post-title-snip-c">
      <Overdrive id={`post-${slug}`}>
        <strong className="post-title-snip">{title}</strong>
      </Overdrive>

      <style jsx>{style}</style>
    </span>
  )
}
