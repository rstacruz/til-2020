import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import { BlogNav } from '../components/BlogNav'
import BlogPostContent from '../components/BlogPostContent'
import Layout from '../components/Layout'
import { MainHeading } from '../components/MainHeading'
import { PostPagination } from '../components/PostPagination'
import { collapseSlashes } from '../helpers/collapseSlashes'
import { HastNode, PageNode } from '../types'
import transformHtmlAst from '../helpers/transformHtmlAst'
import SimplePostContent from '../simple/SimplePostContent'

export interface Props {
  location: string
  pageContext: {
    previous: PageNode
    next: PageNode
  }
  data: {
    markdownRemark: PageNode & {
      htmlAst: HastNode
    }
    site: {
      pathPrefix: string
      siteMetadata: { title: string; siteUrl: string }
    }
  }
}

const BlogPostHelmet = (props: Pick<Props, 'data'>) => {
  const { data } = props
  const post = data.markdownRemark
  const { title, description: frontDescription } = post.frontmatter
  const { pathPrefix } = data.site
  const { siteUrl } = data.site.siteMetadata
  const { slug } = post.fields
  const description = frontDescription || post.excerpt

  // The first part of the excerpt that will be promoted to the title card
  const siteName = 'Today I Learned'

  // Absolute URL of the current article
  const absurl = collapseSlashes(`${siteUrl}/${pathPrefix}/${slug}`)
  const image = `${absurl}/twitter-card.jpg`

  return (
    <Helmet>
      <title>{title}</title>

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:image' content={image} />
      <meta name='twitter:creator' content={'@rstacruz'} />

      <meta property='og:type' content='article' />
      <meta property='og:title' content={title} />
      <meta property='og:image' content={image} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:url' content={absurl} />

      <meta name='description' content={description} />
    </Helmet>
  )
}

const BlogPostTemplate = (props: Props) => {
  if (props.data.markdownRemark.frontmatter.layout === 'simple') {
    return <SimpleBlogPostTemplate {...props} />
  } else {
    return <LiterateBlogPostTemplate {...props} />
  }
}

const SimpleBlogPostTemplate = (props: Props) => {
  const { data } = props
  const post = data.markdownRemark
  const { title, date } = post.frontmatter

  const htmlAst = transformHtmlAst(post.htmlAst)
  const sections = htmlAst.children || []
  const titleBody = (sections[0] && sections[0].children) || []

  return (
    <>
      <BlogPostHelmet data={data} />
      <SimplePostContent
        {...{ title, date, titleBody, body: sections.slice(1) }}
      />
    </>
  )
}
const LiterateBlogPostTemplate = (props: Props) => {
  const { data } = props
  const post = data.markdownRemark
  const { previous, next } = props.pageContext
  const { title, date } = post.frontmatter

  const htmlAst = transformHtmlAst(post.htmlAst)
  const sections = htmlAst.children || []

  // The first part of the excerpt that will be promoted to the title card
  const titleBody = (sections[0] && sections[0].children) || []

  if (props.data.markdownRemark.frontmatter.layout)
    return (
      <Layout location={props.location}>
        <BlogPostHelmet data={data} />
        <MainHeading back />
        <div>
          <BlogNav />
          <BlogPostContent
            {...{ title, date, titleBody, body: sections.slice(1) }}
          />
        </div>
        <PostPagination {...{ previous, next }} />
      </Layout>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      pathPrefix
      siteMetadata {
        title
        siteUrl
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
        description
        layout
        attachments {
          publicURL
        }
      }
    }
  }
`
