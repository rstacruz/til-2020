const config = () => ({
  siteMetadata: metadata(),
  plugins: plugins(),
})

const plugins = () => [
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
]

const metadata = () => ({ title: 'TIL' })

const fs = (options) => ({ resolve: 'gatsby-source-filesystem', options })

module.exports = config()
