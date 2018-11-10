import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

const IndexPage = props => {
  const data = props.data
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      {edges.map(edge => (
        <Item node={edge.node} key={edge.node.fields.slug} />
      ))}
    </Layout>
  )
}

export const Item = ({ node }) => {
  const { slug } = node.fields
  const { title, date } = node.frontmatter
  return (
    <div>
      <Link to={slug}>
        <strong>{title || slug}</strong>
        <small>{date}</small>
      </Link>
    </div>
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
