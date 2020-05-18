import React from 'react'
import { groupBy } from 'lodash-es'
import CSS from './ListingPage.module.css'
import { PageLink, Book } from '../types'
import ListingGroup from './ListingGroup'

type Props = {
  pages: PageLink[]
}

const ListingPage = (props: Props) => {
  const { pages } = props
  const booksAndPages = groupBy(pages, 'book')

  const books: Book[] = [
    { id: 'articles', label: 'Articles' },
    { id: 'notes', label: 'Notes' },
    { id: 'archive', label: 'Archives', open: false },
  ]

  return (
    <div className={CSS.root}>
      <div className={CSS.list}>
        {books.map((book) => {
          const pages = booksAndPages[book.id]
          return <ListingGroup book={book} pages={pages} />
        })}
      </div>
    </div>
  )
}

export default ListingPage
