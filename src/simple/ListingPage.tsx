import React from 'react'
import { Link } from 'gatsby'
import CSS from './ListingPage.module.css'

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
    <div class={CSS.root}>
      <div class={CSS.list}>
        {pages.map((page) => (
          <Link to={page.slug} className={CSS.link}>
            <span className={CSS.date}>{page.date || 'Draft'}</span>
            <span className={CSS.title}>{page.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ListingPage
