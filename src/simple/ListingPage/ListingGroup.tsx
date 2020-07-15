import React from 'react'
import { ListingLink } from './ListingLink'
import { PageLink, Book } from '../../types'
import CSS from './ListingGroup.module.css'

function ListingGroup(props: { book: Book; pages: PageLink[] }) {
  const { book, pages } = props
  return (
    <details open={book.open !== false} className={CSS.root}>
      <summary className={CSS.summary}>{book.label}</summary>
      <div className={CSS.list}>
        {pages.map((page, index) => (
          <ListingLink page={page} key={index} />
        ))}
      </div>
    </details>
  )
}

export default ListingGroup
