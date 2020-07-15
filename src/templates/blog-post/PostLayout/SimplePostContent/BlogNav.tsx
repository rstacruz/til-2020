import React, { useState, useCallback, useMemo } from 'react'
import CSS from './BlogNav/BlogNav.module.css'
import { Waypoint } from 'react-waypoint'
import { Link } from 'gatsby'
import cn from 'classnames'
import BackIcon from './BlogNav/BackIcon'

const BlogNav = () => {
  const { Wrapper, isFixed } = useNavWaypoint()
  const expanded = isFixed ? CSS.isCollapsed : CSS.isExpanded

  return (
    <>
      <Wrapper>
        <div className={CSS.placeholder} />
      </Wrapper>

      <div className={cn(CSS.topRight, expanded)}>
        <span>Today I learned</span>
      </div>

      <div className={cn(CSS.topLeft, expanded)}>
        <Link to='/' className={CSS.backLink} aria-label='Back to home'>
          <BackIcon className={CSS.backIcon} />
        </Link>
      </div>
    </>
  )
}

const useNavWaypoint = () => {
  const [isFixed, setIsFixed] = useState<boolean>(true)

  const onEnter = useCallback(() => {
    setIsFixed(false)
  }, [setIsFixed])

  const onLeave = useCallback(() => {
    setIsFixed(true)
  }, [setIsFixed])

  const Wrapper = useMemo(
    () => (props: { children: React.ReactNode }) => {
      return (
        <Waypoint topOffset='-200px' {...{ onEnter, onLeave }}>
          <span>{props.children}</span>
        </Waypoint>
      )
    },
    [setIsFixed]
  )

  return { Wrapper, isFixed }
}

export default BlogNav
