import React from 'react'
import CSS from './MultiComparison.module.css'
import cn from 'classnames'

const MultiComparison = ({ children }) => {
  return (
    <div className={cn(CSS.root)}>
      <div className={CSS.inner}>{children}</div>
    </div>
  )
}

export default MultiComparison
