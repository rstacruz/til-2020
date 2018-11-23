// @flow

import React from 'react'
import CSS from './PostFooter.module.css'

export type Props = {
  title: string,
  date: ?string
}

const PostFooter = (props: Props) => {
  const { title, date } = props
  return (
    <div className={CSS.root}>
      <div className={CSS.body}>
        <h3>Thank you for reading</h3>
        <p>
          You have just read <em>{title}</em>, written on <em>{date}</em>.
        </p>
      </div>
    </div>
  )
}

export default PostFooter
