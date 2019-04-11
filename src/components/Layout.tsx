import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import 'sanitize.css'
import 'typeface-inter'
import 'typeface-work-sans'
import 'typeface-ibm-plex-mono'

import './Layout.fonts.css'

import './Layout.base.css'

export interface Props {
  children: React.ReactNode
  location?: string
}

const Layout = ({ children }: Props) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            fullTitle
            shortDescription
          }
        }
      }
    `}
    render={data => {
      const { fullTitle, shortDescription } = data.site.siteMetadata

      return (
        <>
          <Helmet
            title={fullTitle}
            meta={[{ name: 'description', content: shortDescription }]}
          >
            <html lang='en' />
          </Helmet>
          <div>{children}</div>
        </>
      )
    }}
  />
)

export default Layout
