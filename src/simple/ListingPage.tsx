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
    <div>
      {pages.map((page) => (
        <div>
          <Link to={page.slug}>
            <div className={CSS.link}>
              <span className={CSS.date}>{page.date}</span>
              <span className={CSS.title}>{page.title}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ListingPage
