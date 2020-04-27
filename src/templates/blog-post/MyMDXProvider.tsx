import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import PreCode from '../../simple/lib/PreCode'

const components = {
  pre: PreCode,
}

const MyMDXProvider = ({ children }: { children: React.ReactNode }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)

export default MyMDXProvider
