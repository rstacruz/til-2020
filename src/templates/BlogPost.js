import { graphql, Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import BlogPostContent from '../components/BlogPostContent'
import Layout from '../components/Layout'
import BlogPostTitle from '../components/BlogPostTitle'
import { MainHeading } from '../components/MainHeading'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = post.excerpt
    const { previous, next } = this.props.pageContext
    const { title, date } = post.frontmatter

    return (
      <Layout location={this.props.location}>
        <Helmet
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${title} | ${siteTitle}`}
        />
        <MainHeading />
        <BlogPostTitle title={title} date={date} />
        <BlogPostContent title={title} date={date} htmlAst={post.htmlAst} />
        {previous && (
          <Link to={previous.fields.slug} rel="prev">
            ← {previous.frontmatter.title}
          </Link>
        )}
        {next && (
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title} →
          </Link>
        )}
      </Layout>
    )
  }
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
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
