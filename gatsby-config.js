const config = () => ({
  siteMetadata: metadata(),
  plugins: plugins(),
})

const plugins = () => [
  'gatsby-plugin-typescript',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-postcss',
  {
    resolve: 'gatsby-plugin-purgecss',
    options: {
      printRejected: true,
      tailwind: true,
      whitelist: [],
    },
  },

  // Images
  'gatsby-plugin-sharp',
  'gatsby-remark-images',

  // Pages
  {
    resolve: 'gatsby-plugin-page-creator',
    options: { path: `${__dirname}/pages` },
  },

  // Posts
  ...['2019', '2020'].map((year) => ({
    resolve: 'gatsby-source-filesystem',
    options: { name: 'posts', path: `${__dirname}/posts/${year}` },
  })),

  // MDX Markdown
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      extensions: ['.md', '.mdx'],
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: { maxWidth: 1400 },
        },
      ],
      rehypePlugins: [require('@rstacruz/rehype-sectionize').plugin],
    },
  },
]

const metadata = () => ({ title: 'TIL' })

module.exports = config()
