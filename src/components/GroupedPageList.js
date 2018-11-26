// @flow

import React from 'react'
import { type PageNode } from '../types'
import groupBy from 'group-by'
import PageListGroup from './PageListGroup'

export type Props = {
  pages: Array<{ node: PageNode, key: string }>,
  recentCount: number
}

export type Groups = {
  [id: string]: Array<{ node: PageNode, key: string }>
}

const GroupedPageList = ({ pages, recentCount }: Props) => {
  const groups = groupBy(pages, ({ node }) => getFirstTag(node))
  const categories = getCategoryNames(groups)

  const topPages = pages.slice(0, recentCount)

  return (
    <>
      <PageListGroup name={'Recent posts'} pages={topPages} />

      {categories.map((cat: string) => (
        <PageListGroup key={cat} name={cat} pages={groups[cat]} />
      ))}
    </>
  )
}

GroupedPageList.defaultProps = {
  recentCount: 4
}

/*
 * Returns the first tag of a given page node.
 */

function getFirstTag(node: PageNode): ?string {
  const { tags } = node.frontmatter
  return tags && tags[0]
}

/**
 * Returns categories, sorted by their latest post's date (latest first).
 */

function getCategoryNames(groups: Groups): string[] {
  return Object.keys(groups).sort((a, b) => {
    return (groups[a][0].node.frontmatter.date || '') <
      (groups[b][0].node.frontmatter.date || '')
      ? 1
      : -1
  })
}

export default GroupedPageList
