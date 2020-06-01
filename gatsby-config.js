const config = () => ({
  siteMetadata: metadata(),
  plugins: plugins(),
})

const metadata = () => ({
  title: 'TIL',
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
  // 'gatsby-remark-images',

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

        {
          resolve: 'gatsby-remark-prismjs',
          options: {
            aliases: {
              sh: 'bash',
            },
          },
        },

        // Support animated GIF's
        // See: https://www.gatsbyjs.org/packages/gatsby-remark-images/#supported-formats
        'gatsby-remark-copy-linked-files',
      ],
      rehypePlugins: [require('@rstacruz/rehype-sectionize').plugin],
    },
  },

  // Reading time
  'gatsby-remark-reading-time',

  // Feed
  {
    resolve: 'gatsby-plugin-feed',
    options: {
      query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
              }
            }
          }
        `,
      feeds: [
        {
          serialize: ({ query: { site, allMdx } }) => {
            return allMdx.edges.map((edge) => {
              return {
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              }
            })
          },
          query: `
            {
              allMdx(
                sort: { order: DESC, fields: [frontmatter___date] }
              ) {
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
                    }
                  }
                }
              }
            }
          `,
          output: '/rss.xml',
          title: "Your Site's RSS Feed",
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

module.exports = config()
