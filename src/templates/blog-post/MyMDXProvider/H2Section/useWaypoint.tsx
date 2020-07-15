import React, { useState, useCallback, useMemo } from 'react'
import { Waypoint } from 'react-waypoint'

export const useWaypoint = () => {
  const [isActive, setIsActive] = useState(false)

  const onEnter = useCallback(() => {
    setIsActive(true)
  }, [setIsActive])
  const onLeave = useCallback(() => {
    setIsActive(false)
  }, [setIsActive])

  const Wrapper = useMemo(
    () => (props: { children: React.ReactNode }) => {
      return (
        <Waypoint
          onEnter={onEnter}
          onLeave={onLeave}
          topOffset={'50%'}
          bottomOffset={'45%'}
        >
          <span>{props.children}</span>
        </Waypoint>
      )
    },
    [setIsActive]
  )
  return { Wrapper, isActive }
}
