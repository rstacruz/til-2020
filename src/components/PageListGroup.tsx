import React from 'react'
import PageList from './PageList'
import CSS from './PageListGroup.module.css'

interface Props {
  name: string
  pages: any[]
}

const PageListGroup = ({ name, pages }: Props) => {
  return (
    <div className={CSS.root} key={name}>
      <h2 className={CSS.heading}>{name}</h2>
      <PageList pages={pages} />
    </div>
  )
}

export default PageListGroup
