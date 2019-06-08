import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import './CSS'

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
