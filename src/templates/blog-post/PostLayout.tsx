import React from 'react'
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
  return <SimplePostContent {...post}>{props.children}</SimplePostContent>
}

export default PostLayout
