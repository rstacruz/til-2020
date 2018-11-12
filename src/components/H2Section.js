import React from 'react'
import CardWaypoint from './CardWaypoint'
import './H2Section.css'

const H2Section = ({ children, className }) => {
  return (
    <CardWaypoint>
      {({ entered }) => {
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
