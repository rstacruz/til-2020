import React from 'react'
import PostLink from './PostLink'
import { PageNode } from '../types'
import CSS from './PageList.module.css'

export interface Props {
  pages: Array<{ node: PageNode; key: string }>
}

const PageList = ({ pages }: Props) => {
  return (
    <div className={CSS.root}>
      {pages.map(({ node, key }) => (
        <PostLink node={node} key={key} />
      ))}
    </div>
  )
}

export default PageList
