const config = () => ({
  siteMetadata: metadata(),
  plugins: plugins(),
})

const metadata = () => ({
  title: "Rico Sta. Cruz's blog",
  // Home page title
  fullTitle: 'Today I Learned — web development musings semi-daily',
  description: 'Regular musings on web development',

  // For the feed
  siteUrl: 'https://ricostacruz.com/til',
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
  ...(hasSharp() ? ['gatsby-plugin-sharp'] : []),

  // Allow pages in /pages instead of /src/pages
  {
    resolve: 'gatsby-plugin-page-creator',
    options: { path: `${__dirname}/pages` },
  },

  // Posts
  ...['2013', '2015', '2017', '2018', '2019', '2020'].map((year) => ({
    resolve: 'gatsby-source-filesystem',
    options: { name: 'posts', path: `${__dirname}/posts/${year}` },
  })),

  // MDX Markdown
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      extensions: ['.md', '.mdx'],
      gatsbyRemarkPlugins: [
        // Put images in a responsive container
        ...(hasSharp()
          ? [
              {
                resolve: 'gatsby-remark-images',
                options: { maxWidth: 1400 },
              },
            ]
          : []),

        // Syntax highlighting
        {
          resolve: 'gatsby-remark-prismjs',
          options: {
            aliases: {
              sh: 'bash',
              dosini: 'ini',
            },
          },
        },

        // Support animated GIF's
        // See: https://www.gatsbyjs.org/packages/gatsby-remark-images/#supported-formats
        'gatsby-remark-copy-linked-files',
      ],
      rehypePlugins: [
        // Put h2's into its own section
        require('@rstacruz/rehype-sectionize').plugin,
      ],
    },
  },

  // Reading time
  'gatsby-remark-reading-time',

  // RSS feed
  {
    resolve: 'gatsby-plugin-feed',
    options: {
      query: feedSiteQuery,
      feeds: [
        {
          serialize: ({ query: { site, allMdx } }) => {
            return allMdx.edges.map((edge) => {
              const { node } = edge
              const { frontmatter } = node
              const { siteMetadata } = site

              return {
                title: frontmatter.title,
                date: frontmatter.date,
                description: frontmatter.description || node.excerpt,
                url: siteMetadata.siteUrl + node.fields.slug,
                guid: siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ 'content:encoded': node.html }],
              }
            })
          },
          query: feedEntriesQuery,
          output: '/rss.xml',
          title: "Rico Sta. Cruz's blog",
        },
      ],
    },
  },
]

function hasSharp() {
  try {
    require.resolve('sharp')
    return true
  } catch (e) {
    return false
  }
}

// To allow gql`...` for syntax highlighting
const gql = String.raw

const feedSiteQuery = gql`
  {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`

const feedEntriesQuery = gql`
  {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt
          html
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
          }
        }
      }
    }
  }
`

module.exports = config()
