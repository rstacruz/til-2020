const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = ctx => {
  return {
    plugins: [
      require('postcss-import')(),
      // Yes, it works with apply https://github.com/tailwindcss/tailwindcss/issues/325
      require('tailwindcss'),
      // Workaround for https://github.com/zeit/styled-jsx/issues/366
      require('postcss-discard-comments')(),

      require('postcss-apply')(),
      require('postcss-preset-env')({
        stage: 0,
        preserve: true,
        insertBefore: {
          'all-property': require('postcss-color-mod-function')
        }
      }),

      require('postcss-browser-reporter')(),
      require('postcss-reporter')()
    ]
  }
}
