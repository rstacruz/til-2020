const config = () => ({
  siteMetadata: metadata(),
  plugins: plugins(),
})

const plugins = () => [
  'gatsby-plugin-typescript',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-postcss',

  // Remove unused selectors
  {
    resolve: 'gatsby-plugin-purgecss',
    options: {
      printRejected: true,
      tailwind: true,
      whitelistPatterns: [/:global/],
      // It strips out 'dl dl', 'hr', 'nav ul', and other legit selectors
      // from sanitize.css
      ignore: ['sanitize.css'],
    },
  },

  // Images
  'gatsby-plugin-sharp',
  'gatsby-remark-images',

  // Allow pages in /pages instead of /src/pages
  {
    resolve: 'gatsby-plugin-page-creator',
    options: { path: `${__dirname}/pages` },
  },

  // Posts
  ...['2018', '2019', '2020'].map((year) => ({
    resolve: 'gatsby-source-filesystem',
    options: { name: 'posts', path: `${__dirname}/posts/${year}` },
  })),

  // MDX Markdown
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      extensions: ['.md', '.mdx'],
      gatsbyRemarkPlugins: [
        // Put images ina  responsive container
        {
          resolve: 'gatsby-remark-images',
          options: { maxWidth: 1400 },
        },

        // Support animated GIF's
        // See: https://www.gatsbyjs.org/packages/gatsby-remark-images/#supported-formats
        'gatsby-remark-copy-linked-files',
      ],
      rehypePlugins: [require('@rstacruz/rehype-sectionize').plugin],
    },
  },
]

const metadata = () => ({ title: 'TIL' })

module.exports = config()
