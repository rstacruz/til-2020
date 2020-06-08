import React from 'react'
import { ListingLink } from '../ListingLink'
import { Book, PageLink } from '../../types'
import CSS from './ArticleListingGroup.module.css'

function ArticleListingGroup(props: { book: Book; pages: PageLink[] }) {
  const { book, pages } = props

  return (
    <div className={CSS.root}>
      {pages.map((page) => (
        <ListingLink page={page} />
      ))}
    </div>
  )
}

export default ArticleListingGroup
