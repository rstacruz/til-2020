import React from 'react'
import { Helmet } from 'react-helmet'

type Props = {
  /** Description */
  description?: string
  /* Language in the <html> tag */
  lang?: 'en'
  /** Title to appear in social cards, defaults to the value of `title` */
  ogTitle?: string
  ogDescription?: string
  /** (eg `'article'`) */
  ogType?: string
  /** Title to appear in <title>, defaults to the value of `title` */
  seoTitle?: string
  seoDescription?: string
  /** Default title */
  title?: string
  keywords?: string[]
  /** Canonical URL */
  url?: string
}

function MetaTags(meta: Props) {
  const seoTitle = meta.seoTitle || meta.title
  const ogTitle = meta.ogTitle || meta.title
  const ogDescription = meta.ogDescription || meta.description
  const seoDescription = meta.seoDescription || meta.description

  return (
    <Helmet>
      {meta.lang ? <html lang={meta.lang} /> : null}
      {meta.ogType ? <meta property='og:type' content={meta.ogType} /> : null}

      {seoTitle ? <title>{seoTitle}</title> : null}
      {ogTitle ? <meta property='og:title' content={ogTitle} /> : null}
      {ogTitle ? <meta name='twitter:title' content={ogTitle} /> : null}

      {meta.keywords ? (
        <meta name='keywords' content={meta.keywords.join(',')} />
      ) : null}

      {seoDescription ? (
        <meta name='description' content={seoDescription} />
      ) : null}
      {ogDescription ? (
        <meta property='og:description' content={ogDescription} />
      ) : null}
      {ogDescription ? (
        <meta name='twitter:description' content={ogDescription} />
      ) : null}

      {meta.url ? <link rel='canonical' href={meta.url} /> : null}
      {meta.url ? <meta property='og:url' content={meta.url} /> : null}
    </Helmet>
  )
}

export default MetaTags
