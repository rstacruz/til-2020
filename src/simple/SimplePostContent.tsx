import React from 'react'
import { HastNode } from '../types'
import makeToReact from '../helpers/to_react'

const Div = ({ children, ...props }) => <div {...props}>{children}</div>

const toReact = makeToReact({
  components: {
    'h2-body': Div,
    'h2-section': Div,
    'h3-body': Div,
    'h3-section': Div,
    'multi-comparison': Div,
    'next-block': Div
  }
})

interface Props {
  title: string
  date: string | void
  body: HastNode[]
  titleBody: any
}

const SimplePostContent = (props: Props) => {
  const { title, date, body: sections } = props
  return (
    <div>
      <h1>{title}</h1>
      {date ? <h5>{date}</h5> : null}
      {sections.map(body => toReact(body))}
    </div>
  )
}

export default SimplePostContent
