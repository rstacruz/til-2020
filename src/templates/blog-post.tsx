import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PostLayout from './blog-post/PostLayout'

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
  const { data } = props
  const post = data.mdx

  return (
    <div>
      <PostLayout>
        <MDXRenderer>{post.body}</MDXRenderer>
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
      }
      body
    }
  }
`
