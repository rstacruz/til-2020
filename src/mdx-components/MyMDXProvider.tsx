import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import PreCode from './lib/PreCode'
import H2Section from './lib/H2Section'
import NextBlock from './lib/NextBlock'
import Notice from './lib/Notice'
import Figure from './lib/Figure'

const components = {
  pre: PreCode,
  section: H2Section,
  figure: Figure,
  NextBlock,
  Notice,
  Figure,
}

const MyMDXProvider = ({ children }: { children: React.ReactNode }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)

export default MyMDXProvider
