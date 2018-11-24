// @flow

import Overdrive from 'react-overdrive'
import React from 'react'
import CSS from './PostTitleSnip.module.css'
import cn from 'classnames'

export type Props = {
  slug: string,
  title: string,
  className?: string,
  variant?: '-small' | null
}

export const PostTitleSnip = ({ slug, title, variant, className }: Props) => {
  const varClass = variant === '-small' ? CSS.isSmall : ''

  return (
    <span className={cn(CSS.root, varClass)}>
      <Overdrive id={`post-${slug}`}>
        <strong className={cn(CSS.title, varClass)}>{title}</strong>
      </Overdrive>
    </span>
  )
}
