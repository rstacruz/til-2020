import React from 'react'
import CSS from './PostLayout.module.css'
import SimplePostContent from '../../simple/SimplePostContent'

const PostLayout = (props: any) => {
  return (
    <div className={CSS.root}>
      <SimplePostContent title='sup' date='2020-04-04' description='hey there'>
        {props.children}
      </SimplePostContent>
    </div>
  )
}

export default PostLayout
