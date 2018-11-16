// @flow

import * as React from 'react'
import CardWaypoint, { type State } from './CardWaypoint'
import './H2Section.css'

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

        return <section className={sectionClass}>{children}</section>
      }}
    </CardWaypoint>
  )
}

export default H2Section
