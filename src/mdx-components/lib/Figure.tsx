import React from 'react'
import CSS from './Figure.module.css'
import cn from 'classnames'

type Props = {
  children: React.ReactNode
  className?: string
  wide?: boolean
}

const Figure = (props: Props) => {
  const classes = (props.className || '').split(' ')

  const figureClass = cn(CSS.root, props.className, {
    [CSS.isWide]: props.wide || classes.includes('-wide'),
    [CSS.cover]: classes.includes('cover'),
  })

  return <figure className={figureClass}>{props.children}</figure>
}

export default Figure
