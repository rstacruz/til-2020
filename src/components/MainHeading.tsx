import { Link } from 'gatsby'
import React from 'react'
import CSS from './MainHeading.module.css'
import CardWaypoint from './CardWaypoint'
import cn from 'classnames'
// import { PostTitleSnip } from './PostTitleSnip'

export const MainHeading = () => {
  return (
    <CardWaypoint topOffset='0%' bottomOffset='10%'>
      {({ entered }) => (
        <div className={cn(CSS.root, entered ? CSS.isActive : CSS.isInactive)}>
          <div className={CSS.fixed}>
            <Link to='/' className={CSS.brandlink}>
              <BackIcon />
            </Link>
          </div>

          <div className={CSS.strapline}>
            <div className={CSS.left}>
              This is{' '}
              <Link to='/' className={CSS.homelink}>
                Today I Learned
              </Link>{' '}
              — a collection of things I've learned in my day-to-day web
              development work.
            </div>
            <div className={CSS.right}>@rstacruz</div>
          </div>
        </div>
      )}
    </CardWaypoint>
  )
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
