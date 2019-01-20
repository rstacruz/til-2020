import React from 'react'
import CSS from './PostFooter.module.css'
import CardWaypoint, { State } from './CardWaypoint'
import cn from 'classnames'

export interface Props {
  title: string
  date: string | void
}

const PostFooter = (props: Props) => {
  const { title, date } = props
  return (
    <CardWaypoint bottomOffset='50%' topOffset='0%'>
      {({ entered }: State) => {
        const activeClass = entered ? '-active' : '-inactive'
        return (
          <div className={cn(CSS.root, activeClass)}>
            <div className={CSS.body}>
              <h3>Thank you for reading</h3>
              <p>
                You have just read <em>{title}</em>, written on <em>{date}</em>.
              </p>
            </div>
          </div>
        )
      }}
    </CardWaypoint>
  )
}

export default PostFooter
