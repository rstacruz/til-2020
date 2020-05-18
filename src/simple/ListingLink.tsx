import React from 'react'
import { Link } from 'gatsby'
import CSS from './ListingLink.module.css'
import { PageLink } from '../types'
import Unorphan from './lib/Unorphan'

export function ListingLink({ page }: { page: PageLink }) {
  const { readingTime } = page

  // Approximate reading time
  const mins = Math.max(1, Math.round(readingTime.time / 60000))
  const apples = mins <= 2 ? 1 : mins <= 5 ? 2 : 3
  const year = getYear(page.date)

  return (
    <Link to={page.slug} className={CSS.link}>
      <article>
        <div className={CSS.titleLine}>
          <h2 className={CSS.title}>
            <Unorphan>{page.title}</Unorphan>
          </h2>{' '}
          {year ? (
            <span
              className={CSS.year}
              title={page.date || ''}
            >{`(${year})`}</span>
          ) : (
            <span className={CSS.year}>{`(Draft)`}</span>
          )}
        </div>

        {page.description ? (
          <span className={CSS.description}>
            <Unorphan>{formatDescription(page.description) || ''}</Unorphan>
          </span>
        ) : null}

        <span className={CSS.meta}>
          <span className={CSS.category}>
            {page.tags ? page.tags[0] : 'Article'}
          </span>

          <span className={CSS.toRead} title={`${readingTime.words} words`}>
            {mins} {mins === 1 ? 'min' : 'mins'}{' '}
            {[...Array(apples)].map((_, index) => (
              <span key={index}>&mdash; </span>
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

function getYear(date: string | null | void): string | null {
  if (!date) return null
  return /^\d{4}/.test(date) ? date.substr(0, 4) : null
}
