import React from 'react'
import CodeHighlight from './CodeHighlight'
import CSS from './PreCode.module.css'

interface Props {
  children: React.ReactNode
}

const PreCode = ({ children, ...props }: Props) => {
  return (
    <div className={CSS.root} {...props}>
      <CodeHighlight className={CSS.pre}>{children}</CodeHighlight>
    </div>
  )
}

export default PreCode
