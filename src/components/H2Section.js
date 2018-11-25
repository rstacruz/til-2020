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
        const activeClass = entered ? '-active' : '-inactive'

        return (
          <section className={cn(CSS.root, className, activeClass)}>
            {children}
          </section>
        )
      }}
    </CardWaypoint>
  )
}

export default H2Section
