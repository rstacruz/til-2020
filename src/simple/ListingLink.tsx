import React from 'react'
import { Link } from 'gatsby'
import CSS from './ListingLink.module.css'
import { PageLink } from '../types'

export function ListingLink({ page }: { page: PageLink }) {
  const { readingTime } = page

  // Approximate reading time
  const mins = Math.max(1, Math.round(readingTime.time / 60000))
  const apples = mins <= 2 ? 1 : mins <= 5 ? 2 : 3

  return (
    <Link to={page.slug} className={CSS.link}>
      <article>
        <h2 className={CSS.title}>{page.title}</h2>

        {page.description ? (
          <span className={CSS.description}>
            {formatDescription(page.description) || ''}
          </span>
        ) : null}

        <span className={CSS.meta}>
          <span className={CSS.date}>{page.date || 'Draft'}</span>
          <span className={CSS.toRead} title={`${readingTime.words} words`}>
            {mins} {mins === 1 ? 'min' : 'mins'}{' '}
            {[...Array(apples)].map((_, index) => (
              <span key={index}>·</span>
            ))}
          </span>
        </span>
      </article>
    </Link>
  )
}

/**
 * Add punctuation
 */

function formatDescription(input: string | null | void): string | void {
  if (!input) return
  if (/[\.\?\!]$/.test(input)) return input

  return `${input}.`
}
