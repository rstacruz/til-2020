import cn from 'classnames'
import { Link } from 'gatsby'
import React, { useState } from 'react'
import { Waypoint } from 'react-waypoint'
import BackIcon from './BackIcon'
import CSS from './MainHeading.module.css'

interface State {
  /** If the thing should be visible */
  visible: boolean
}

interface Props {
  back?: boolean
}

export const MainHeading = ({ back }: Props) => {
  const [state, setState] = useState<State>({ visible: false })
  return (
    <Waypoint
      onEnter={doHandleEnter({ setState })}
      onLeave={doHandleLeave({ setState })}
    >
      <span>
        <div className={CSS.placeholder} />
        <nav className={cn(CSS.nav, { [CSS.isVisible]: state.visible })}>
          <span className={CSS.left}>
            {back ? (
              <Link to='/' className={CSS.brandlink}>
                <BackIcon />
              </Link>
            ) : null}
          </span>

          <span className={CSS.right}>
            <a href='https://github.com/rstacruz' className={CSS.otherLink}>
              <span>@rstacruz</span>
              <img
                width={16}
                height={16}
                src='https://avatars.githubusercontent.com/rstacruz?s=64'
              />
            </a>
          </span>
        </nav>
      </span>
    </Waypoint>
  )
}

/**
 * Handle the waypoint entry. This will show the navigation bar if it's not
 * visible.
 */

const doHandleEnter = ({ setState }) => () => {
  setState({ visible: true })
}

const doHandleLeave = ({ setState }) => () => {
  setState({ visible: false })
}
