import cn from 'classnames'
import { Link } from 'gatsby'
import React, { useState } from 'react'
import { Waypoint } from 'react-waypoint'
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
                src='https://avatars.githubusercontent.com/rstacruz'
              />
            </a>
          </span>
        </nav>
      </span>
    </Waypoint>
  )
}

const doHandleEnter = ({ setState }) => () => {
  setState({ visible: true })
}

const doHandleLeave = ({ setState }) => () => {
  setState({ visible: false })
}

const BackIcon = () => (
  <svg
    version='1.1'
    width='36'
    height='36'
    viewBox='0 0 36 36'
    preserveAspectRatio='xMidYMid meet'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M27.66,15.61,18,6,8.34,15.61A1,1,0,1,0,9.75,17L17,9.81V28.94a1,1,0,1,0,2,0V9.81L26.25,17a1,1,0,0,0,1.41-1.42Z'
      className='clr-i-outline clr-i-outline-path-1'
    />
    <rect x='0' y='0' width='36' height='36' fillOpacity='0' />
  </svg>
)
