/* import H2Section from './lib/H2Section' */
/* import H3Section from './lib/H3Section' */
/* import PreCode from './lib/PreCode' */
/* import NextBlock from './lib/NextBlock' */

import React from 'react'
import MarkdownStyles from './lib/MarkdownStyles'
import BlogNav from './lib/BlogNav'
import Unorphan from './lib/Unorphan'
import CSS from './SimplePostContent.module.css'
import ByLine from './lib/ByLine'
import SimplePostFooter from './lib/SimplePostFooter'

interface Props {
  title: string
  description: string | null | void
  book: string | null | void
  date: string | void
  children: React.ReactNode
}

const SimplePostContent = (props: Props) => {
  const { title, date, description, book, children } = props

  return (
    <div>
      <BlogNav />
      <div className={CSS.root}>
        <h1 className={CSS.title}>
          <Unorphan>{title}</Unorphan>
        </h1>

        {!!description && book === 'articles' && (
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
