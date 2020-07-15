import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import ListingPage from './blog-index/ListingPage'
import MetaTags from './shared/MetaTags'
import useSiteMetadata from './shared/useSiteMetadata'

const Home = (props: { data?: any }) => {
  const data = useStaticQuery(query)
  const site = useSiteMetadata()
  const { pages } = usePages(props.data || data)
  return (
    <>
      <MetaTags
        lang={'en'}
        title={site.fullTitle || site.title}
        description={site.description}
        keywords={['JavaScript', 'Web Development', 'React', 'Ruby']}
        ogType={'article'}
      />
      <ListingPage pages={pages} />
    </>
  )
}

export const usePages = (data: any) => {
  const pages = data.allMdx.edges.map(({ node }: any) => {
    const { fields, frontmatter } = node

    return {
      slug: fields.slug,
      date: frontmatter.date,
      title: frontmatter.title,
      book: fields.book,
      tags: frontmatter.tags,
      description: frontmatter.description,
      readingTime: fields.readingTime,
    }
  })

  return { pages }
}

const query = graphql`
  fragment BlogListingNode on Mdx {
    excerpt
    fields {
      slug
      book
      readingTime {
        time
        words
      }
    }
    frontmatter {
      date(formatString: "YYYY-MM-DD")
      title
      tags
      description
    }
  }

  query GetBlogListingPages {
    allMdx(
      filter: { frontmatter: { date: { ne: null } } }
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

export default Home
