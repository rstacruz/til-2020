import cn from 'classnames'
import React from 'react'
import CSS from './H3Section.module.css'

const H3Section = ({ children, className }) => {
  return <section className={cn(CSS.root, className)}>{children}</section>
}

export default H3Section
