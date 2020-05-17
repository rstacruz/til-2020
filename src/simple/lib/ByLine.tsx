import React from 'react'
import CSS from './ByLine.module.css'

interface Props {
  date: string | null | void
}

const ByLine = (props: Props) => {
  const { date } = props
  const author = 'Rico Sta. Cruz'
  const avatarUrl = 'https://github.com/rstacruz.png?size=128'

  return (
    <div className={CSS.root}>
      <img className={CSS.avatar} src={avatarUrl} alt='Author photo' />
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
