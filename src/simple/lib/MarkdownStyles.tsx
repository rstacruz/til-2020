import React from 'react'
import CSS from './MarkdownStyles.module.css'

const MarkdownStyles = ({ children }: { children: React.ReactNode }) => {
  return <div className={CSS.root}>{children}</div>
}

export default MarkdownStyles
