import React from 'react'
import CSS from './ByLine.module.css'

interface Props {
  date: string | null | void
}

const ByLine = (props: Props) => {
  const { date } = props
  const author = 'Rico Sta. Cruz'

  return (
    <div className={CSS.root}>
      <span className={CSS.author}>{author}</span>
      <span className={CSS.sep} />
      {date ? (
        <span className={CSS.date}>{date}</span>
      ) : (
        <span className={CSS.draft}>Unpublished</span>
      )}
    </div>
  )
}

export default ByLine
