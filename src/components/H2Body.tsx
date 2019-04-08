import cn from 'classnames'
import React from 'react'
import CSS from './H2Section.module.css'

const H2Body = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn(className)}>
      {children}
    </div>
  )
}

export default H2Body
