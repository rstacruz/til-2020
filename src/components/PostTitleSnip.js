// @flow

import Overdrive from 'react-overdrive'
import React from 'react'
import style from './PostTitleSnip.scoped.css'

export type Props = {
  slug: string,
  title: string,
  variant?: '-small' | null
}

export const PostTitleSnip = ({ slug, title, variant }: Props) => {
  const varClass = variant || ''

  return (
    <span className={`post-title-snip-c ${varClass}`}>
      <Overdrive id={`post-${slug}`}>
        <strong className={`post-title-snip ${varClass}`}>{title}</strong>
      </Overdrive>

      <style jsx>{style}</style>
    </span>
  )
}
