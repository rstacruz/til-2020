import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import 'sanitize.css'

const useSiteMetadata = () => {
  const query = graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `
  return useStaticQuery(query).site.siteMetadata
}

const Layout = ({ children }) => {
  const siteMetadata = useSiteMetadata()

  return (
    <>
      <Helmet
        title={siteMetadata.title}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      >
        <html lang='en' />
      </Helmet>
      {/*<h1>{siteMetadata.title}</h1>*/}
      <div>{children}</div>
    </>
  )
}

export default Layout
