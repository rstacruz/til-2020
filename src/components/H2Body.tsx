import cn from 'classnames'
import React from 'react'

const H2Body = (props: Props) => {
  const { children, className, ...divProps } = props

  return (
    <div {...divProps} className={cn(className)}>
      {children}
    </div>
  )
}

interface Props {
  children: React.ReactNode
  className?: string
}

export default H2Body
