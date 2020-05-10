import React from 'react'
import CodeHighlight from './CodeHighlight'
import CSS from './PreCode.module.css'
import { Figurify } from './Figure'

interface Props {
  children: React.ReactNode
}

const PreCode = ({ children, ...props }: Props) => {
  return (
    <Figurify code>
      <div className={CSS.root} {...props}>
        <CodeHighlight className={CSS.pre}>{children}</CodeHighlight>
      </div>
    </Figurify>
  )
}

export default PreCode
