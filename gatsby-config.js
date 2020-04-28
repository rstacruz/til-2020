const config = () => ({
  siteMetadata: metadata(),
  plugins: plugins(),
})

const plugins = () => [
  'gatsby-plugin-typescript',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-postcss',
  {
    resolve: 'gatsby-plugin-page-creator',
    options: { path: `${__dirname}/pages` },
  },
  ...['2020'].map((year) => ({
    resolve: 'gatsby-source-filesystem',
    options: { name: 'posts', path: `${__dirname}/posts/${year}` },
  })),
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      extensions: ['.md', '.mdx'],
      rehypePlugins: [require('@rstacruz/rehype-sectionize').plugin],
    },
  },
]

const metadata = () => ({ title: 'TIL' })

module.exports = config()
