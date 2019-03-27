function supportsManifest() {
  try {
    return require.resolve('gatsby-plugin-manifest')
  } catch (e) {
    return false
  }
}

function fs({ name, path }) {
  return {
    resolve: 'gatsby-source-filesystem',
    options: { name, path }
  }
}

module.exports = {
  pathPrefix: '/til',
  siteMetadata: {
    title: 'TIL',
    fullTitle: 'Today I Learned — web development musings semi-daily',
    shortDescription:
      'TIL - a collection of things I learned on my day-to-day web development work.',

    // For gatsby-feed
    description:
      'TIL - a collection of things I learned on my day-to-day web development work.',
    siteUrl: 'https://ricostacruz.com/tilnext/'
  },
  plugins: [
    'gatsby-plugin-feed',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-20473929-1'
      }
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://ricostacruz.com/til'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    fs({ name: `posts`, path: `${__dirname}/posts/drafts` }),
    fs({ name: `posts`, path: `${__dirname}/posts/2019` }),
    fs({ name: `posts`, path: `${__dirname}/posts/2018` }),
    fs({ name: `posts`, path: `${__dirname}/posts/2017` }),
    fs({ name: `posts`, path: `${__dirname}/posts/2016` }),
    fs({ name: `posts`, path: `${__dirname}/posts/2015` }),
    fs({ name: `posts`, path: `${__dirname}/posts/2013` }),
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-component',
          {
            resolve: 'gatsby-remark-images',
            options: { maxWidth: 1400 }
          },
          'gatsby-remark-copy-linked-files'
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
