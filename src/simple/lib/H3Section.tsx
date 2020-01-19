import React from 'react'

const H3Section = ({ children, ...props }) => {
  return (
    <section className='H3Section' {...props}>
      {children}
    </section>
  )
}

export default H3Section
