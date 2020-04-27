import React from 'react'
import { Helmet } from 'react-helmet'
import useSiteMetadata from '../hooks/useSiteMetadata'
import 'sanitize.css'
import 'typeface-gentium-basic'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
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
