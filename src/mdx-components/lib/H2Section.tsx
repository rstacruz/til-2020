import React from 'react'
import CSS from './H2Section.module.css'

interface Props {
  children: React.ReactNode
}

const H2Section = ({ children, ...props }: Props) => {
  return (
    <section className={CSS.root} {...props}>
      <div className={CSS.inner}>{children}</div>
      <span className={CSS.separator}></span>
    </section>
  )
}

export default H2Section
