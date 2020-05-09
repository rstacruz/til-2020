import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import ListingPage from '../simple/ListingPage'

const Home = () => {
  const data = useStaticQuery(query)
  const pages = usePages(data)
  return <ListingPage pages={pages} />
}

export const usePages = (data: any) => {
  return data.allMdx.edges.map(({ node }: any) => {
    const { fields, frontmatter } = node

    return {
      slug: fields.slug,
      date: frontmatter.date,
      title: frontmatter.title,
      tags: frontmatter.tags,
      description: frontmatter.description,
      timeToRead: node.timeToRead,
    }
  })
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
          timeToRead
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            tags
            description
          }
        }
      }
    }
  }
`

export default Home
