import React from 'react'
import CSS from './H3Section.module.css'
import cn from 'classnames'

const H3Section = ({ children, className }) => {
  return <section className={cn(CSS.root, className)}>{children}</section>
}

export default H3Section
