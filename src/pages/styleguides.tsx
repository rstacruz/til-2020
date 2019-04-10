/*
 * Home page
 */

import React from 'react'
import Styleguide from '../styleguide/index'

const StyleguidePage = () => {
  return (
    <Styleguide
      title='TIL styleguides'
      pages={{
        home: () => <div>hey</div>,
        'home/2': () => <div>hahaha</div>
      }}
    />
  )
}

export default StyleguidePage
