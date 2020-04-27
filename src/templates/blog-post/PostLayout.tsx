import React from 'react'
import CSS from './PostLayout.module.css'

const PostLayout = (props: any) => {
  return <div className={CSS.root}>{props.children}</div>
}

export default PostLayout
