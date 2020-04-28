import React from 'react'
import { Link } from 'gatsby'

export type PageLink = {
  slug: string
  daet: string
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
          <Link to={page.slug}>{page.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default ListingPage
