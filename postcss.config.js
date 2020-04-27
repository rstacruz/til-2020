const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = (ctx) => {
  return {
    plugins: [
      require('tailwindcss'),
      require('postcss-preset-env')({ stage: 0 }),
    ],
  }
}
