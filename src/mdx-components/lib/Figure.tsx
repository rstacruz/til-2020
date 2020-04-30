import React from 'react'
import CSS from './Figure.module.css'
import cn from 'classnames'

type Props = {
  children: React.ReactNode
  className?: string
  wide?: boolean
  cover?: boolean
}

const Figure = (props: Props) => {
  const cssClasses = (props.className || '').split(' ')
  const classes = [...cssClasses, ...Object.keys(props)]

  const figureClass = cn(CSS.root, {
    [CSS.isWide]: classes.includes('-wide'),
    [CSS.cover]: classes.includes('cover'),
    [CSS.table]: classes.includes('table'),
  })

  return <figure className={figureClass}>{props.children}</figure>
}

export default Figure
