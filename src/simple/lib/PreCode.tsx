import React from 'react'
import CodeHighlight from './CodeHighlight'
import CSS from './PreCode.module.css'

const PreCode = ({ children, ...props }) => {
  return (
    <div className={CSS.PreCode} {...props}>
      <CodeHighlight className={CSS.pre}>{children}</CodeHighlight>
    </div>
  )
}

export default PreCode
