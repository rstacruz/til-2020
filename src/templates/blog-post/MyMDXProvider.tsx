import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import PreCode from './MyMDXProvider/PreCode'
import H2Section from './MyMDXProvider/H2Section'
import NextBlock from './MyMDXProvider/NextBlock'
import Notice from './MyMDXProvider/Notice'
import Figure from './Figure'

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
