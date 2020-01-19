import React, { useState, useCallback, useMemo } from 'react'
import CSS from './BlogNav.module.css'
import { Waypoint } from 'react-waypoint'
import { Link } from 'gatsby'
import cn from 'classnames'

interface Props {
  title: string
}

const BlogNav = (props: Props) => {
  const { Wrapper, isFixed } = useNavWaypoint()
  const { title } = props

  return (
    <>
      <Wrapper>
        <span className={CSS.placeholder} />
      </Wrapper>

      <div
        className={cn(CSS.root, {
          [CSS.isFixed]: isFixed
        })}
      >
        {isFixed ? (
          <>
            <Link to='/'>TIL</Link>
            <span>
              <span className={CSS.separator}>/</span>
              <span className={CSS.title}>{title}</span>
            </span>
          </>
        ) : (
          <>
            <Link to='/'>Today I Learned</Link>
          </>
        )}
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
        <Waypoint {...{ onEnter, onLeave }}>
          <span>{props.children}</span>
        </Waypoint>
      )
    },
    [setIsFixed]
  )

  return { Wrapper, isFixed }
}

export default BlogNav
