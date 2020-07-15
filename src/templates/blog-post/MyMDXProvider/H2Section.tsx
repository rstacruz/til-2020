import React from 'react'
import CSS from './H2Section/H2Section.module.css'
import cn from 'classnames'
import { useWaypoint } from './H2Section/useWaypoint'

interface Props {
  children: React.ReactNode
}

const H2Section = ({ children, ...props }: Props) => {
  const { Wrapper, isActive } = useWaypoint()

  return (
    <Wrapper>
      <section
        className={cn(CSS.root, { isActive, isInactive: !isActive })}
        {...props}
      >
        <div className={CSS.inner}>{children}</div>
        <span className={CSS.separator}></span>
      </section>
    </Wrapper>
  )
}

export default H2Section
