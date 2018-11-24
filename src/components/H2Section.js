// @flow

import * as React from 'react'
import CardWaypoint, { type State } from './CardWaypoint'
import CSS from './H2Section.module.css'
import cn from 'classnames'

export type Props = {
  children: React.Node,
  className: string | string[]
}

const H2Section = ({ children, className }: Props) => {
  return (
    <CardWaypoint>
      {({ entered }: State) => {
        if (Array.isArray(className)) className = className.join(' ')
        const sectionClass = [
          className,
          entered ? '-active' : '-inactive'
        ].join(' ')

        return (
          <section className={cn(CSS.root, sectionClass)}>{children}</section>
        )
      }}
    </CardWaypoint>
  )
}

export default H2Section
