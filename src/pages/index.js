/*
 * Home page
 * =========
 *
 * @flow
 */

import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PageList from '../components/PageList'
import { type PageNode } from '../types'

export type Props = {
  data: {
    site: {
      siteMetadata: { title: string },
    },
    allMarkdownRemark: {
      edges: Array<{
        node: PageNode,
      }>,
    },
  },
}

const IndexPage = (props: Props) => {
  const data = props.data
  const { edges } = data.allMarkdownRemark

  const pages = edges.map((edge: { node: PageNode }) => ({
    node: edge.node,
    key: edge.node.fields.slug,
  }))

  return (
    <Layout>
      <PageList pages={pages} />
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
