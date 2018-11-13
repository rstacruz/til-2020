// @flow

import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import BlogPostContent from '../components/BlogPostContent'
import BlogPostTitle from '../components/BlogPostTitle'
import decorate from 'rehype-decorate'
import sectionize from 'rehype-sectionize-headings'
import Layout from '../components/Layout'
import { MainHeading } from '../components/MainHeading'
import { type PageNode, type HastNode } from '../types'
import { BlogNav } from '../components/BlogNav'
import { PostPagination } from '../components/PostPagination'
import { ColophonSection } from '../components/ColophonSection'

export type Props = {
  location: string,
  pageContext: {
    previous: PageNode,
    next: PageNode
  },
  data: {
    markdownRemark: PageNode & {
      htmlAst: HastNode
    },
    site: { siteMetadata: { title: string } }
  }
}

class BlogPostTemplate extends React.Component<Props> {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = post.excerpt
    const { previous, next } = this.props.pageContext
    const { title, date } = post.frontmatter
    const { slug } = post.fields
    const htmlAst = transformHtmlAst(post.htmlAst)
    const sections = htmlAst.children || []

    // The first part of the excerpt that will be promoted to the title card
    const titleBody = (sections[0] && sections[0].children) || []

    return (
      <Layout location={this.props.location}>
        <Helmet
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${title} | ${siteTitle}`}
        />
        <MainHeading {...{ title, slug }} />
        <div>
          <BlogNav {...{ title, slug }} />
          <BlogPostContent
            {...{ title, date, titleBody, body: sections.slice(1) }}
          />
        </div>

        <PostPagination {...{ previous, next }} />
        <ColophonSection />
      </Layout>
    )
  }
}

function transformHtmlAst(ast: HastNode): HastNode {
  ast = decorate(ast)
  ast = sectionize(ast, {
    h2: { sectionTag: 'h2-section' },
    h3: { sectionTag: 'h3-section' }
  })
  return ast
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      htmlAst
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`