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
    title: 'TIL',
    fullTitle: 'Today I Learned — web development musings semi-daily',
    shortDescription:
      'TIL - a collection of things I learned on my day-to-day web development work.'
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-plugin-postcss',
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
      options: { name: `posts`, path: `${__dirname}/posts/2018` }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `posts`, path: `${__dirname}/posts/2016` }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `posts`, path: `${__dirname}/posts/2015` }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `posts`, path: `${__dirname}/posts/2013` }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-component',
          {
            resolve: 'gatsby-remark-images',
            options: { maxWidth: 1024 }
          }
        ]
      }
    },
    ...(supportsManifest()
      ? [
          {
            resolve: `gatsby-plugin-manifest`,
            options: {
              name: 'TIL',
              short_name: 'til',
              start_url: '/',
              background_color: '#fafafa',
              theme_color: '#fafafa',
              display: 'minimal-ui',
              icon: 'src/images/gatsby-icon.png'
            }
          }
        ]
      : [])
  ]
}
