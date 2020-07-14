import { groupBy } from 'lodash-es'
import React from 'react'
import { Section, SectionRoot } from '../templates/shared/SectionNavigation'
import { PageLink } from '../types'
import CSS from './ListingPage.module.css'
import ArticleListingGroup from './ListingPage/ArticleListingGroup'
import ListingGroup from './ListingPage/ListingGroup'
import SectionNav from './ListingPage/SectionNav'

type Props = {
  pages: PageLink[]
}

const ListingPage = (props: Props) => {
  const { pages } = props
  const booksAndPages = groupBy(pages, 'book')

  const sections = {
    ...(booksAndPages.articles ? { articles: { label: 'Articles' } } : {}),
    ...(booksAndPages.notes ? { notes: { label: 'Notes' } } : {}),
    ...(booksAndPages.archive ? { archive: { label: 'Archive' } } : {}),
  }

  return (
    <SectionRoot sections={Object.keys(sections)}>
      <div className={CSS.screen} />
      <div className={CSS.root}>
        <div className={CSS.list}>
          <div className={CSS.nav}>
            <SectionNav sections={sections} />
          </div>

          {/* Articles */}
          {booksAndPages.articles ? (
            <Section id='articles' className={CSS.section}>
              <ArticleListingGroup pages={booksAndPages.articles} />
            </Section>
          ) : null}

          {/* Notes */}
          {booksAndPages.notes ? (
            <Section id='notes' className={CSS.section}>
              <ListingGroup
                book={{ id: 'notes', label: 'Notes' }}
                pages={booksAndPages.notes}
              />
            </Section>
          ) : null}

          {/* Archive */}
          {booksAndPages.archive ? (
            <Section id='archive' className={CSS.section}>
              <ListingGroup
                book={{ id: 'archive', label: 'Archive', open: false }}
                pages={booksAndPages.archive}
              />
            </Section>
          ) : null}
        </div>
      </div>
    </SectionRoot>
  )
}

export default ListingPage
