import cn from 'classnames'
import React from 'react'
import CardWaypoint, { State } from './CardWaypoint'
import CSS from './PostFooter.module.css'

export interface Props {
  title: string
  date: string | void
}

const PostFooter = (props: Props) => {
  const { title, date } = props
  return (
    <div className={cn(CSS.root, '-active')}>
      <div className={CSS.body}>
        <p>
          {date ? (
            <>
              You have just read <em>{title}</em>, written on <em>{date}</em>.
            </>
          ) : (
            <>
              You have just read <em>{title}</em>, which is an unpublished
              draft.
            </>
          )}{' '}
          This is Today I Learned, a collection of random tidbits I've learned
          through my day-to-day web development work. I'm Rico Sta. Cruz.
        </p>
      </div>
    </div>
  )
}

export default PostFooter
