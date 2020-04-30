import React from 'react'
import cn from 'classnames'

interface Props {
  children: React.ReactNode
  title?: string
  className?: string
}

const NextBlock = ({ title, children, className, ...props }: Props) => (
  <blockquote {...props} className={cn('next', className)}>
    <strong>Next:</strong> {title || children}
  </blockquote>
)

export default NextBlock
