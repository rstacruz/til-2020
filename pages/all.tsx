import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import ListingPage from '../src/simple/ListingPage'

const Home = (props: any) => {
  const data = useStaticQuery(props.query || query)

  const pages = data.allMdx.edges.map(({ node }: any) => ({
    slug: node.fields.slug,
    date: node.frontmatter.date,
    title: node.frontmatter.title,
    tags: node.frontmatter.tags,
  }))

  return <ListingPage pages={pages} />
}

const query = graphql`
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
