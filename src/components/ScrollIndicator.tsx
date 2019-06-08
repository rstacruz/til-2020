import cn from 'classnames'
import React from 'react'
import CSS from './ScrollIndicator.module.css'

interface Props {
  /** Index of the current active section */
  active: number

  /** Total number of sections */
  count: number
}

const ScrollIndicator = (props: Props) => {
  const { count } = props

  // Not much of a point to an indicator when there's only one
  if (count < 2) return <span />

  return (
    <div className={CSS.root}>
      {Array(count + 1)
        .join('x')
        .split('')
        .map((_, idx) => {
          return (
            <span
              className={cn({
                [CSS.peg]: true,
                [CSS.isActive]: idx === active
              })}
            />
          )
        })}
    </div>
  )
}

export default ScrollIndicator
