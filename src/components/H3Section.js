import React from 'react'
import style from './H3Section.global.css'

const H3Section = ({ children, className }) => (
  <section className={className}>
    {children}
    <style jsx>{style}</style>
  </section>
)

export default H3Section
