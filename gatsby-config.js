function supportsManifest() {
  try {
    return require.resolve('gatsby-plugin-manifest')
  } catch (e) {
    return false
  }
}

module.exports = {
  pathPrefix: '/tilnext',
  siteMetadata: {
    title: 'TIL'
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-styled-jsx',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-component']
      }
    },
    ...(supportsManifest()
      ? [
          {
            resolve: `gatsby-plugin-manifest`,
            options: {
              name: 'gatsby-starter-default',
              short_name: 'starter',
              start_url: '/',
              background_color: '#663399',
              theme_color: '#663399',
              display: 'minimal-ui',
              icon: 'src/images/gatsby-icon.png' // This path is relative to the root of the site.
            }
          }
        ]
      : [])
  ]
}
