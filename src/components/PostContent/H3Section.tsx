import cn from 'classnames'
import React from 'react'
import CSS from './H3Section.module.css'

interface Props {
  children: React.ReactNode
  className?: string
}

const H3Section = ({ children, className }: Props) => {
  return <section className={cn(CSS.root, className)}>{children}</section>
}

export default H3Section
