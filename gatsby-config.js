const config = () => ({
  siteMetadata: metadata(),
  plugins: plugins(),
})

const plugins = () => [
  'gatsby-plugin-typescript',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-postcss',
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
