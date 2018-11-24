import React from 'react'
import cn from 'classnames'

const H2Body = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn(className)}>
      {children}
    </div>
  )
}

export default H2Body
