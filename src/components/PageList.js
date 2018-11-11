// @flow

import PostLink from '../components/PostLink'
import React from 'react'
import { type PageNode } from '../types'
import style from './PageList.scoped.css'

export type Props = {
  pages: Array<{ node: PageNode, key: string }>
}

const PageList = ({ pages }: Props) => {
  return (
    <div className="page-list">
      {pages.map(({ node, key }) => (
        <PostLink node={node} key={key} />
      ))}
      <style jsx>{style}</style>
    </div>
  )
}

export default PageList
