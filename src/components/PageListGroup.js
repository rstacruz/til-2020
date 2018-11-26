import React from 'react'
import PageList from './PageList'

const PageListGroup = ({ name, pages }) => {
  return (
    <div key={name}>
      <h2 style={{ textAlign: 'center' }}>{name}</h2>
      <PageList pages={pages} />
    </div>
  )
}

export default PageListGroup
