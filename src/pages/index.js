/*
 * Home page
 * =========
 *
 * @flow
 */

import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostLink from '../components/PostLink'

export type Props = {
  data: {
    site: {
      siteMetadata: { title: string },
    },
    allMarkdownRemark: {
      edges: Array<{
        node: {
          excerpt: string,
          fields: { slug: string },
          frontmatter: { title: string, date: string },
        },
      }>,
    },
  },
}

const IndexPage = (props: Props) => {
  const data = props.data
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <div className="post-list">
        {edges.map(edge => (
          <PostLink node={edge.node} key={edge.node.fields.slug} />
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
