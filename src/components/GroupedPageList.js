// @flow

import React from 'react'
import { type PageNode } from '../types'
import groupBy from 'group-by'
import PageListGroup from './PageListGroup'

export type Props = {
  pages: Array<{ node: PageNode, key: string }>
}

const GroupedPageList = ({ pages }: Props) => {
  const groups = groupBy(pages, ({ node }) => getFirstTag(node))
  const categories = Object.keys(groups).sort()

  const topPages = pages.slice(0, 3)

  return (
    <>
      <PageListGroup name={'Recent posts'} pages={topPages} />

      {categories.map((cat: string) => (
        <PageListGroup key={cat} name={cat} pages={groups[cat]} />
      ))}
    </>
  )
}

function getFirstTag(node: PageNode): ?string {
  const { tags } = node.frontmatter
  return tags && tags[0]
}

export default GroupedPageList
