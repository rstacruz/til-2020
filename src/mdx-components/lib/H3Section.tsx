import cn from 'classnames'
import React from 'react'
import CSS from './H3Section.module.css'
import { useWaypoint } from '../../simple/lib/useWaypoint'

interface Props {
  children: React.ReactNode
  className?: string
}

const H3Section = ({ children, className }: Props) => {
  const { Wrapper, isActive } = useWaypoint()
  return (
    <Wrapper>
      <section
        className={cn(CSS.root, className, {
          isActive: isActive,
          isInactive: !isActive,
        })}
      >
        {children}
      </section>
    </Wrapper>
  )
}

export default H3Section
