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
          )}
        </p>
      </div>
    </div>
  )
}

export default PostFooter
