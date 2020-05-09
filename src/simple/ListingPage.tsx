import React from 'react'
import CSS from './ListingPage.module.css'
import { ListingLink } from './ListingLink'

export type PageLink = {
  slug: string
  date: string
  title: string
  tags: string
}

type Props = {
  pages: PageLink[]
}

const ListingPage = (props: Props) => {
  const { pages } = props
  return (
    <div className={CSS.root}>
      <div className={CSS.list}>
        {pages.map((page) => (
          <ListingLink page={page} />
        ))}
      </div>
    </div>
  )
}

export default ListingPage
