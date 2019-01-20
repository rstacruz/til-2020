const blog = require('./src/gatsby/blog')

// The path to the React component of blog posts
const templatePath = require('path').resolve(
  __dirname,
  'src/templates/BlogPost.tsx'
)

module.exports = blog({
  templatePath
})
