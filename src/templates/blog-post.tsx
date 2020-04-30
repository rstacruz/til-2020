import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PostLayout from './blog-post/PostLayout'
import MyMDXProvider from '../mdx-components/MyMDXProvider'

interface Props {
  data: {
    mdx: any
    site: any
  }
  pageContext: {
    previous: any
    next: any
  }
  /** eg, "/post-name-here" */
  uri: string
}

const BlogPost = (props: Props) => {
  const mdx = props.data.mdx

  const post = {
    title: mdx.frontmatter.title,
    date: mdx.frontmatter.date,
    description: mdx.frontmatter.description,
  }

  return (
    <div>
      <PostLayout post={post}>
        <MyMDXProvider>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MyMDXProvider>
      </PostLayout>
    </div>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      body
    }
  }
`
