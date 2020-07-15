import React from 'react'
import CSS from './Notice.module.css'

type Props = {
  archived?: boolean
  children: React.ReactNode
}

function Notice(props: Props) {
  return <div className={CSS.root}>{props.children}</div>
}

export default Notice
