import React from 'react'
import H2Section from './lib/H2Section'
import H3Section from './lib/H3Section'
import PreCode from './lib/PreCode'
import MarkdownStyles from './lib/MarkdownStyles'
import BlogNav from './lib/BlogNav'
import Unorphan from './lib/Unorphan'
import CSS from './SimplePostContent.module.css'
import ByLine from './lib/ByLine'
import SimplePostFooter from './lib/SimplePostFooter'
import cn from 'classnames'
import NextBlock from './lib/NextBlock'

const Div = ({ children, ...props }: { children: React.ReactNode }) => (
  <div {...props}>{children}</div>
)

interface Props {
  title: string
  description: string | null | void
  date: string | void
  children: React.ReactNode
}

const SimplePostContent = (props: Props) => {
  const { title, date, description, children } = props
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
        <MarkdownStyles>{children}</MarkdownStyles>

        <MarkdownStyles>
          <SimplePostFooter title={title} date={date} />
        </MarkdownStyles>
      </div>
    </div>
  )
}

export default SimplePostContent
