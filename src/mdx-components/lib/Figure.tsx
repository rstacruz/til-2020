import React from 'react'
import CSS from './Figure.module.css'
import cn from 'classnames'

type Props = {
  children: React.ReactNode
  className?: string
  caption?: string
  title?: string
  wide?: boolean
  cover?: boolean
}

/**
 * @example
 *     <Figure>...</Figure>
 *     <Figure cover>...</Figure>
 *     <Figure table>...</Figure>
 *     <Figure code title='hello'>...</Figure>
 */
const Figure = (props: Props) => {
  const { title } = props

  const cssClasses = (props.className || '').split(' ')
  const classes = [...cssClasses, ...Object.keys(props)]

  const figureClass = cn(CSS.root, {
    [CSS.isWide]: classes.includes('-wide'),
    [CSS.cover]: classes.includes('cover'),
    [CSS.table]: classes.includes('table'),
  })

  return (
    <figure className={figureClass}>
      {title ? <figcaption>{title}</figcaption> : null}
      {props.children}
    </figure>
  )
}

export default Figure
