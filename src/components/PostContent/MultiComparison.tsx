import React from 'react'
import CSS from './MultiComparison.module.css'
import cn from 'classnames'

interface Props {
  children: React.ReactNode
}

const MultiComparison = ({ children }: Props) => {
  return (
    <div className={cn(CSS.root)}>
      <div className={CSS.inner}>{children}</div>
    </div>
  )
}

export default MultiComparison
