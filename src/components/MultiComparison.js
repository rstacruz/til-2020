import React from 'react'
import CSS from './MultiComparison.module.css'
import cn from 'classnames'

const MultiComparison = ({ children }) => {
  return <div className={cn(CSS.root)}>{children}</div>
}

export default MultiComparison
