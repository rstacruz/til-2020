import React from 'react'
import './H2Section.css'

const H2Section = ({ children, className }) => (
  <>
    <section className={className}>{children}</section>
    <div className="h2-separator" />
  </>
)

export default H2Section
