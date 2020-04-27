module.exports = (ctx) => {
  return {
    plugins: [
      require('postcss-import'),
      require('tailwindcss'),
      require('postcss-preset-env')({ stage: 0 }),
    ],
  }
}
