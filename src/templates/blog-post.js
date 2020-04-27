import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

// interface Props {
//   data: any;

//   /** eg, "/post-name-here" */
//   uri: string;
// }

const BlogPost = (props: Props) => {
  const { data } = props
  const post = data.mdx

  return (
    <div>
      <MDXRenderer>{post.body}</MDXRenderer>
      <pre>{JSON.stringify(props, null, 2)}</pre>
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
