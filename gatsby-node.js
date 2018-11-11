const blog = require('./src/gatsby/blog')

// The path to the React component of blog posts
const templatePath = require('path').resolve(
  __dirname,
  'src/templates/BlogPost.js'
)

module.exports = blog({
  templatePath
})

module.exports = {
  ...module.exports,
  onCreateWebpackConfig: ({ actions, loaders, getConfig }) => {
    const config = getConfig()

    const oneOfs = config.module.rules.filter(rule => rule.oneOf)
    const loader = require('styled-jsx/webpack').loader

    if (oneOfs && oneOfs[0]) {
      oneOfs[0].oneOf = [
        {
          test: /\.css$/,
          resourceQuery: /resolve/,
          use: [loaders.js(), { loader, options: { type: 'resolve' } }]
        },
        {
          test: /\.css$/,
          resourceQuery: /global/,
          use: [loaders.js(), { loader, options: { type: 'global' } }]
        },
        {
          test: /\.css$/,
          resourceQuery: /scoped/,
          use: [loaders.js(), { loader, options: { type: 'scoped' } }]
        },
        {
          test: /\.resolve\.css$/,
          use: [loaders.js(), { loader, options: { type: 'resolve' } }]
        },
        {
          test: /\.global\.css$/,
          use: [loaders.js(), { loader, options: { type: 'global' } }]
        },
        {
          test: /\.scoped\.css$/,
          use: [loaders.js(), { loader, options: { type: 'scoped' } }]
        },
        ...oneOfs[0].oneOf
      ]
    }

    actions.replaceWebpackConfig(config)
  }
}
