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
  onCreateWebpackConfig: ({ actions, loaders }) => {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /\.scoped\.css$/,
            use: [
              loaders.js(),
              {
                loader: require('styled-jsx/webpack').loader,
                options: {
                  // plugins: ['styled-jsx-plugin-postcss']
                }
              }
            ]
          }
        ]
      }
    })
  }
}
