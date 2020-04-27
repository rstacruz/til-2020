import React from 'react'
import CSS from './PostLayout.module.css'

const PostLayout = (props) => {
  return (
    <div className={CSS.root}>
      hey
      {props.children}
    </div>
  )
}

export default PostLayout
