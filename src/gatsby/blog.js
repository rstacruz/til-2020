const { createFilePath } = require('gatsby-source-filesystem')

/*::

  export type Context = {
    templatePath: string,
    buildContext: (Node) => object
  }

*/

const buildExports = (ctx /*: Context */) => {
  return {
    createPages: createPages.bind(null, ctx),
    onCreateNode: onCreateNode.bind(null, ctx)
  }
}

const onCreateNode = (ctx /*: any */, { node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({
      node,
      getNode,
      trailingSlash: false
    })

    createNodeField({
      name: 'slug',
      node,
      value
    })
  }
}

/**
 * Create pages.
 */

const createPages = (
  ctx /*: Context */,
  { actions, graphql } /*: { actions: Actions, graphql: Graphql } */
) => {
  return graphql(buildQuery()).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const { edges } = result.data.publishedPosts
    edges.forEach(({ node }, idx) => {
      const next = edges[idx + 1]
      const prev = edges[idx - 1]
      buildPage(ctx, {
        actions,
        next: next && next.node,
        node,
        previous: prev && prev.node
      })
    })

    const { edges: draftEdges } = result.data.draftPosts
    draftEdges.forEach(({ node }) => {
      buildPage(ctx, { actions, node })
    })
  })
}

/**
 * Build a page from a node
 */

function buildPage(
  ctx /*: Context */,
  { node, actions, next, previous } /*: { node: any, actions: Actions } */
) {
  const { createPage } = actions

  const extraContext =
    typeof ctx.buildContext === 'function' && ctx.buildContext(node)

  const context = {
    next,
    nodeType: 'post',
    node_id: node.id,
    previous,
    slug: node.fields.slug,
    title: node.frontmatter.title,
    ...(extraContext || {})
  }

  createPage({
    component: ctx.templatePath,
    context,
    path: node.fields.slug
  })
}

/**
 * The graphql query
 */

function buildQuery() {
  return `
  {
    publishedPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { date: { ne: null } } }
      limit: 1000
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    draftPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { date: { eq: null } } }
      limit: 1000
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
}

module.exports = buildExports
