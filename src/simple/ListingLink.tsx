import React from 'react'
import { Link } from 'gatsby'
import CSS from './ListingLink.module.css'
import { PageLink } from './ListingPage'

export function ListingLink({ page }: { page: PageLink }) {
  return (
    <Link to={page.slug} className={CSS.link}>
      <article>
        <h2 className={CSS.title}>{page.title}</h2>

        <span className={CSS.description}>
          {formatDescription(page.description)}
        </span>

        <span className={CSS.meta}>
          <span className={CSS.date}>{page.date || 'Draft'}</span>
          <span className={CSS.toRead}>{page.timeToRead} mins</span>
        </span>
      </article>
    </Link>
  )
}

/**
 * Add punctuation
 */

function formatDescription(input: string | null | void): string {
  if (!input) return input
  if (/[\.\?\!]$/.test(input)) return input

  return `${input}.`
}
