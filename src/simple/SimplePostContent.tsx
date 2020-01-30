import React from 'react'
import { HastNode } from '../types'
import makeToReact from '../helpers/to_react'
import 'typeface-public-sans'
import H2Section from './lib/H2Section'
import H3Section from './lib/H3Section'
import PreCode from './lib/PreCode'
import MarkdownStyles from './lib/MarkdownStyles'
import BlogNav from './lib/BlogNav'
import Unorphan from './lib/Unorphan'
import CSS from './SimplePostContent.module.css'
import ByLine from './lib/ByLine'

const Div = ({ children, ...props }) => <div {...props}>{children}</div>

const toReact = makeToReact({
  components: {
    'h2-body': Div,
    'h2-section': H2Section,
    'h3-body': Div,
    'h3-section': H3Section,
    'multi-comparison': Div,
    'next-block': Div,
    pre: PreCode
  }
})

interface Props {
  title: string
  description: string | null | void
  date: string | void
  body: HastNode[]
}

const SimplePostContent = (props: Props) => {
  const { title, date, description, body: sections } = props
  return (
    <div>
      <BlogNav title={title} />
      <div className={CSS.root}>
        <h1 className={CSS.title}>
          <Unorphan>{title}</Unorphan>
        </h1>
        {!!description && (
          <p className={CSS.description}>
            <Unorphan>{description}</Unorphan>
          </p>
        )}
        <ByLine date={date} />
        <MarkdownStyles>{sections.map(body => toReact(body))}</MarkdownStyles>
      </div>
    </div>
  )
}

export default SimplePostContent
