// @flow

import React from 'react'
import './H2Section.css'

export type Props = {
  title: string,
  date: ?string
}

const PostFooter = (props: Props) => {
  const { title, date } = props
  return (
    <div
      className='h2-section -inactive'
      style={{
        paddingTop: '64px',
        paddingBottom: '64px',
        marginTop: 0,
        boxShadow: 'none'
      }}
    >
      <div className='body' style={{ textAlign: 'center' }}>
        <h3 style={{ margin: 0, padding: 0, color: '#111' }}>
          Thank you for reading
        </h3>
        <p style={{ margin: 0, padding: 0, color: '#8888' }}>
          You have just read <em>{title}</em>, written on <em>{date}</em>.
        </p>
      </div>
    </div>
  )
}

export default PostFooter
