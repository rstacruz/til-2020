import React from 'react'
import Home from '../src/templates/blog-index'
import { graphql, useStaticQuery } from 'gatsby'

const DraftsPage = () => {
  const data = useStaticQuery(query)
  return <Home data={data} />
}

const query = graphql`
  query GetDraftBlogListingPages {
    allMdx(
      filter: { frontmatter: { date: { eq: null } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          ...BlogListingNode
        }
      }
    }
  }
`

export default DraftsPage
