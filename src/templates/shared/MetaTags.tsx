import React from 'react'
import { Helmet } from 'react-helmet'

type Props = {
  ogType?: 'article'
  lang?: 'en'
  title?: string
  keywords?: string[]
  description?: string
  url?: string
}

function MetaTags(meta: Props) {
  return (
    <Helmet>
      {meta.lang ? <html lang={meta.lang} /> : null}
      {meta.ogType ? <meta property='og:type' content={meta.ogType} /> : null}

      {meta.title ? <title>{meta.title}</title> : null}
      {meta.title ? <meta property='og:title' content={meta.title} /> : null}
      {meta.title ? <meta name='twitter:title' content={meta.title} /> : null}

      {meta.keywords ? (
        <meta name='keywords' content={meta.keywords.join(',')} />
      ) : null}

      {meta.description ? (
        <meta name='description' content={meta.description} />
      ) : null}
      {meta.description ? (
        <meta property='og:description' content={meta.description} />
      ) : null}
      {meta.description ? (
        <meta name='twitter:description' content={meta.description} />
      ) : null}

      {meta.url ? <link rel='canonical' href={meta.url} /> : null}
      {meta.url ? <meta property='og:url' content={meta.url} /> : null}
    </Helmet>
  )
}

export default MetaTags
