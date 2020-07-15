import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PostLayout from './blog-post/PostLayout'
import MyMDXProvider from './blog-post/MyMDXProvider'
import MetaTags from './shared/MetaTags'

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
  const { frontmatter, fields } = mdx

  const post = {
    title: frontmatter.title,
    date: frontmatter.date,
    description: frontmatter.description,
    book: fields.book,
  }

  return (
    <div>
      <MetaTags
        lang={'en'}
        title={frontmatter.title}
        description={frontmatter.description}
        keywords={frontmatter.tags}
        ogType={'article'}
      />

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
      fields {
        book
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      body
    }
  }
`
