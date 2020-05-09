import React from 'react'
import CSS from './PreCode.module.css'
import { Figurify } from './Figure'

interface Props {
  children: React.ReactNode
}

const PreCode = ({ children, ...props }: Props) => {
  return (
    <Figurify code>
      <div className={CSS.root}>
        <pre {...props}>{children}</pre>
      </div>
    </Figurify>
  )
}

export default PreCode
