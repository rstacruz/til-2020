import React from 'react'
import { groupBy } from 'lodash-es'
import CSS from './ListingPage.module.css'
import { PageLink, Book } from '../types'
import ListingGroup from './ListingGroup'
import ArticleListingGroup from './lib/ArticleListingGroup'
import { SectionRoot, Section } from '../templates/shared/SectionNavigation'

type Props = {
  pages: PageLink[]
}

const ListingPage = (props: Props) => {
  const { pages } = props
  const booksAndPages = groupBy(pages, 'book')

  /* const books: { [key: string]: Book } = { */
  /*   articles: { id: 'articles', label: 'Articles' }, */
  /*   notes: { id: 'notes', label: 'Notes' }, */
  /*   archive: { id: 'archive', label: 'Archives', open: false }, */
  /* } */

  return (
    <>
      <div className={CSS.screen} />
      <div className={CSS.root}>
        <div className={CSS.list}>
          {/* Articles */}
          {booksAndPages.articles ? (
            <Section id='articles'>
              <ArticleListingGroup
                book={{ id: 'articles', label: 'Articles' }}
                pages={booksAndPages.articles}
              />
            </Section>
          ) : null}

          {/* Notes */}
          {booksAndPages.notes ? (
            <Section id='notes'>
              <ListingGroup
                book={{ id: 'notes', label: 'Notes' }}
                pages={booksAndPages.notes}
              />
            </Section>
          ) : null}

          {/* Archive */}
          {booksAndPages.archive ? (
            <Section id='archive'>
              <ListingGroup
                book={{ id: 'archive', label: 'Archive', open: false }}
                pages={booksAndPages.archive}
              />
            </Section>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default ListingPage
