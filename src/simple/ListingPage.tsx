import React from 'react'
import { groupBy } from 'lodash-es'
import CSS from './ListingPage.module.css'
import { ListingLink } from './ListingLink'
import { PageLink } from '../types'

type Props = {
  pages: PageLink[]
}

const ListingPage = (props: Props) => {
  const { pages } = props
  const booksAndPages = groupBy(pages, 'book')

  const books = [
    { id: 'articles', label: 'Articles' },
    { id: 'notes', label: 'Notes' },
    { id: 'archive', label: 'Archives', open: false },
  ]

  return (
    <div className={CSS.root}>
      <div className={CSS.list}>
        {books.map((book) => {
          const pages = booksAndPages[book.id]
          return (
            <>
              <details open={book.open !== false}>
                <summary>{book.label}</summary>
                {pages.map((page) => (
                  <ListingLink page={page} />
                ))}
              </details>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default ListingPage
