import React from 'react'
import CSS from './H2Section.module.css'

const H2Section = ({ children, ...props }) => {
  return (
    <section className={CSS.root} {...props}>
      <div className={CSS.inner}>{children}</div>
      <span className={CSS.separator}></span>
    </section>
  )
}

export default H2Section
