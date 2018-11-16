import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'sanitize.css'
import './Layout.css'

const Layout = ({ children }) => (
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
            meta={[
              { name: 'description', content: shortDescription },
              { name: 'robots', content: 'noindex' }
              // { name: 'keywords', content: 'sample, something' }
            ]}
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
