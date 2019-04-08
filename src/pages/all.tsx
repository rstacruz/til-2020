/*
 * Home page
 */

import { graphql } from 'gatsby'
import React from 'react'
import GroupedPageList from '../components/GroupedPageList'
import Layout from '../components/Layout'
import { MainHeading } from '../components/MainHeading'
import { PageNode } from '../types'

export interface Props {
  data: {
    site: {
      siteMetadata: { title: string }
    }
    allMarkdownRemark: {
      edges: Array<{
        node: PageNode
      }>
    }
  }
}

const IndexPage = (props: Props) => {
  const data = props.data
  const { edges } = data.allMarkdownRemark

  const pages = edges.map((edge: { node: PageNode }) => ({
    key: edge.node.fields.slug,
    node: edge.node
  }))

  return (
    <Layout>
      <Home pages={pages} />
    </Layout>
  )
}

const Home = ({ pages }) => {
  return (
    <>
      <MainHeading />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px' }}>
        <GroupedPageList pages={pages} />
      </div>
    </>
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
            date(formatString: "YYYY-MM-DD")
            title
            tags
          }
        }
      }
    }
  }
`
