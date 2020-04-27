const TITLE = 'New Site'
const SHORT_TITLE = 'My new web site'
const THEME_COLOR = '#101018'

module.exports = {
  siteMetadata: {
    title: TITLE,
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    { resolve: 'gatsby-plugin-postcss' },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    fs({ name: 'posts', path: `${__dirname}/posts/2020` }),
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
      },
    },
    manifest(),
  ],
}

function fs(options) {
  return { resolve: 'gatsby-source-filesystem', options }
}

function manifest() {
  return {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: TITLE,
      short_name: SHORT_TITLE,
      start_url: '/',
      background_color: THEME_COLOR,
      theme_color: THEME_COLOR,
      display: 'minimal-ui',
      icon: 'src/images/icon.png',
    },
  }
}
