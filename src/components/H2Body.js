import React from 'react'
import CSS from './H2Section.module.css'
import cn from 'classnames'

const H2Body = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn(CSS.body, className)}>
      {children}
    </div>
  )
}

export default H2Body
