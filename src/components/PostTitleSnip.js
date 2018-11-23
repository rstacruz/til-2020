// @flow

import Overdrive from 'react-overdrive'
import React from 'react'
import CSS from './PostTitleSnip.module.css'

export type Props = {
  slug: string,
  title: string,
  variant?: '-small' | null
}

export const PostTitleSnip = ({ slug, title, variant }: Props) => {
  const varClass = variant === '-small' ? CSS.isSmall : ''

  return (
    <span className={`${CSS.root} ${varClass}`}>
      <Overdrive id={`post-${slug}`}>
        <strong className={`${CSS.title} ${varClass}`}>{title}</strong>
      </Overdrive>
    </span>
  )
}
