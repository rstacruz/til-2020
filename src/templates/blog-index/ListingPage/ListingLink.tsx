import React from 'react'
import cn from 'classnames'
import { Link } from 'gatsby'
import CSS from './ArticleListingGroup/ListingLink.module.css'
import { PageLink } from '../../../types'
import Unorphan from '../../shared/Unorphan'
import { slug } from 'github-slugger'

type Props = { page: PageLink; big?: boolean }

export function ListingLink(props: Props) {
  const { page } = props
  const { readingTime } = page

  // Approximate reading time
  const mins = Math.max(1, Math.round(readingTime.time / 60000))
  // const apples = mins <= 2 ? 1 : mins <= 5 ? 2 : 3
  const year = getYear(page.date)

  const h2id = `${slug(page.title)}-link`

  return (
    <Link
      to={page.slug}
      className={cn(CSS.link, { [CSS.bigLink]: props.big })}
      aria-labelledby={h2id}
    >
      <article>
        <div className={CSS.titleLine}>
          <h2 className={CSS.title} id={h2id}>
            <span className={CSS.titleSpan}>
              <Unorphan>{page.title}</Unorphan>
            </span>
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
            {mins} min read
            {/*
              {' '}
              {[...Array(apples)].map((_, index) => (
                <span key={index}>&mdash; </span>
                ))}
            */}
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
