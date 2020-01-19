import cn from 'classnames'
import React from 'react'
import CSS from './H3Section.module.css'
import { useWaypoint } from './useWaypoint'

const H3Section = ({ children, className }) => {
  const { Wrapper, isActive } = useWaypoint()
  return (
    <Wrapper>
      <section
        className={cn(CSS.root, className, {
          isActive: isActive,
          isInactive: !isActive
        })}
      >
        {children}
      </section>
    </Wrapper>
  )
}

export default H3Section
