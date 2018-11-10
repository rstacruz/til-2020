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
          @import url('https://fonts.googleapis.com/css?family=Alegreya:400,400i');
          @import url('https://fonts.googleapis.com/css?family=Cousine');
          @import url('https://fonts.googleapis.com/css?family=Roboto');
          @import url('https://fonts.googleapis.com/css?family=Fira+Mono:300,400');
          @import url('https://fonts.googleapis.com/css?family=PT+Mono:300,400');
          @import url('https://fonts.googleapis.com/css?family=Chivo:700,900');
        `}</style>

        {/*<h1>{data.site.siteMetadata.title}</h1>*/}
        <div>{children}</div>
      </>
    )}
  />
)

export default Layout
