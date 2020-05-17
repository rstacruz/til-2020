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
  const booksAndPages = Object.entries(groupBy(pages, 'book'))

  return (
    <div className={CSS.root}>
      <div className={CSS.list}>
        {booksAndPages.map(([bookName, pages]) => (
          <>
            <details open>
              <summary>{bookName}</summary>
              {pages.map((page) => (
                <ListingLink page={page} />
              ))}
            </details>
          </>
        ))}
      </div>
    </div>
  )
}

export default ListingPage
