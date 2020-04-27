// https://tailwindcss.com/docs/configuration/
const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    extend: {
      modscale: {
        sm: { ratio: 1.14, linebase: 1.6, lineratio: 0.957 },
        md: { ratio: 1.18, linebase: 1.6, lineratio: 0.957 },
      },
      colors: {
        a: {
          '500': '#705075',
        },
        n: {
          mute: '#5b687a',
          faded: '#718096',
          line: '#cbd5e0',
        },
      },
    },
  },
  variants: {},
  plugins: [
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        '.thin-scrollbar': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme('colors.gray.500')} transparent`,
        },

        '.shadow-8': {
          boxShadow: [
            `0 0px 1px rgba(0, 0, 80, 0.05)`,
            `0 2px 2px rgba(0, 0, 80, 0.05)`,
            `0 4px 4px rgba(0, 0, 80, 0)`,
            `0 8px 8px rgba(0, 0, 80, 0)`,
            `0 16px 16px rgba(0, 0, 80, 0)`,
          ].join(', '),
        },

        '.shadow-16': {
          boxShadow: [
            `0 0px 1px rgba(0, 0, 80, 0.06)`,
            `0 2px 2px rgba(0, 0, 80, 0.06)`,
            `0 4px 4px rgba(0, 0, 80, 0.02)`,
            `0 8px 8px rgba(0, 0, 80, 0.02)`,
          ].join(', '),
        },

        '.shadow-32': {
          boxShadow: [
            `0 0px 1px rgba(0, 0, 80, 0.08)`,
            `0 2px 2px rgba(0, 0, 80, 0.08)`,
            `0 4px 4px rgba(0, 0, 80, 0.03)`,
            `0 8px 8px rgba(0, 0, 80, 0.03)`,
            `0 16px 16px rgba(0, 0, 80, 0.03)`,
          ].join(', '),
        },

        '.type-body-sans': {
          fontFamily: "'Public Sans', Roboto, sans-serif",
          fontWeight: '400',
          fontStyle: 'normal',
          fontSize: '1em',
        },

        '.type-italic-serif': {
          fontFamily: "'Gentium Basic', serif",
          fontWeight: '400',
          fontStyle: 'italic',
          fontSize: '1.1em',
        },

        '.small-font': {
          fontSize: '0.82em',
        },
      })
    }),
  ],
}
