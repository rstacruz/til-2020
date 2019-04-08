import cn from 'classnames'
import { Link } from 'gatsby'
import React from 'react'
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
          You have just read <span>{title}</span>,{' '}
          {date ? (
            <>
              written on <span>{date}</span>.
            </>
          ) : (
            <>an unpublished draft.</>
          )}{' '}
          This is <Link to='/'>Today I Learned</Link>, a collection of random
          tidbits I've learned through my day-to-day web development work. I'm
          Rico Sta. Cruz.
        </p>
        <p>
          <Link to='/'>
            <strong>&larr; More articles</strong>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default PostFooter
