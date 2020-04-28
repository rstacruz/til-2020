import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import PreCode from './lib/PreCode'
import H2Section from './lib/H2Section'

const components = {
  pre: PreCode,
  section: H2Section,
}

const MyMDXProvider = ({ children }: { children: React.ReactNode }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)

export default MyMDXProvider
