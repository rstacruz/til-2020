// @flow

import React from 'react'
import './H2Section.css'
import './PostFooter.css'

export type Props = {
  title: string,
  date: ?string
}

const PostFooter = (props: Props) => {
  const { title, date } = props
  return (
    <div className='post-footer'>
      <div className='body'>
        <h3>Thank you for reading</h3>
        <p>
          You have just read <em>{title}</em>, written on <em>{date}</em>.
        </p>
      </div>
    </div>
  )
}

export default PostFooter
