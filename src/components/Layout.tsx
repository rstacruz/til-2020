import React from 'react'
import { Helmet } from 'react-helmet'
import useSiteMetadata from '../hooks/useSiteMetadata'

// Typefaces
import 'typeface-eczar'
import 'typeface-fira-mono'
import 'typeface-gentium-basic'
import 'typeface-public-sans'

// Global CSS
import 'sanitize.css'
import './Layout.base.css'

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
