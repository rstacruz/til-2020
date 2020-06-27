import React from 'react'
import { ListingLink } from '../ListingLink'
import { Book, PageLink } from '../../types'
import CSS from './ArticleListingGroup.module.css'

function ArticleListingGroup(props: { book: Book; pages: PageLink[] }) {
  const { book, pages } = props

  return (
    <div className={CSS.root}>
      <h2 className={CSS.heading}>Latest articles</h2>

      {pages.map((page, index) => (
        <ListingLink page={page} key={index} big={index === 0} />
      ))}
    </div>
  )
}

export default ArticleListingGroup
