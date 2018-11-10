import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'sanitize.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>

        <style jsx global>{`
          @import url('https://typeof.net/Iosevka/iosevka/webfont.css');
          @import url('https://fonts.googleapis.com/css?family=Alegreya:400i');
          @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans');
          @import url('https://fonts.googleapis.com/css?family=Chivo:400,700');
        `}</style>

        {/*<h1>{data.site.siteMetadata.title}</h1>*/}
        <div>{children}</div>
      </>
    )}
  />
)

export default Layout
