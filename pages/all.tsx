import { graphql } from 'gatsby'
import React from 'react'
import ListingPage from '../src/simple/ListingPage'

const Home = (props: any) => {
  const { data } = props

  const pages = data.allMdx.edges.map(({ node }: any) => ({
    slug: node.fields.slug,
    date: node.frontmatter.date,
    title: node.frontmatter.title,
    tags: node.frontmatter.tags,
  }))

  return <ListingPage pages={pages} />
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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

export default Home
