import React from 'react'
import CSS from './PostLayout.module.css'
import SimplePostContent from '../../simple/SimplePostContent'

type Props = {
  post: {
    title: string
    date: string
    description: string
  }
  children: React.ReactNode
}

const PostLayout = (props: Props) => {
  const { post } = props

  return (
    <div className={CSS.root}>
      <SimplePostContent {...post}>{props.children}</SimplePostContent>
    </div>
  )
}

export default PostLayout
