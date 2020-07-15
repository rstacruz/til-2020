/* import H2Section from './lib/H2Section' */
/* import H3Section from './lib/H3Section' */
/* import PreCode from './lib/PreCode' */
/* import NextBlock from './lib/NextBlock' */

import React from 'react'
import MarkdownStyles from './PostLayout/SimplePostContent/MarkdownStyles'
import BlogNav from './PostLayout/SimplePostContent/BlogNav'
import Unorphan from '../shared/Unorphan'
import CSS from './PostLayout/SimplePostContent/SimplePostContent.module.css'
import ByLine from './PostLayout/SimplePostContent/ByLine'
import SimplePostFooter from './PostLayout/SimplePostContent/SimplePostFooter'

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
