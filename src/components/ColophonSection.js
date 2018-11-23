import React from 'react'
import { Link } from 'gatsby'
import CSS from './ColophonSection.module.css'

export const ColophonSection = () => {
  return (
    <div className={CSS.root}>
      <Link to='/' className={CSS.link}>
        ←
      </Link>
    </div>
  )
}
