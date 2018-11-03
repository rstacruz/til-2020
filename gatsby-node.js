const blog = require('./src/gatsby/blog')

// The path to the React component of blog posts
const templatePath = require('path').resolve(
  __dirname,
  'src/templates/BlogPost.js'
)

module.exports = blog({
  templatePath,
})
