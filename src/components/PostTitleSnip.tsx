import cn from 'classnames'
import React from 'react'
import Overdrive from 'react-overdrive'
import CSS from './PostTitleSnip.module.css'

export interface Props {
  slug: string
  title: string
  className?: string
  variant?: '-small' | null
}

export const PostTitleSnip = (props: Props) => {
  const { slug, title, variant, className } = props
  const varClass = cn({
    [CSS.isSmall]: variant === '-small'
  })

  return (
    <span className={cn(CSS.root, varClass, className)}>
      <Overdrive id={`post-${slug}`}>
        <strong className={cn(CSS.title, varClass)}>{title}</strong>
      </Overdrive>
    </span>
  )
}
