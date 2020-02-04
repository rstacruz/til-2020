import React from 'react'
import CSS from './ByLine.module.css'

interface Props {
  date: string | null | void
}

const ByLine = (props: Props) => {
  const { date } = props

  return (
    <div className={CSS.root}>
      Rico Sta. Cruz
      <span className={CSS.sep} />
      {date ? <span>{date}</span> : <span>Unpublished</span>}
    </div>
  )
}

export default ByLine
