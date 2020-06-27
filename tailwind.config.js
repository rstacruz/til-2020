// https://tailwindcss.com/docs/configuration/
const plugin = require('tailwindcss/plugin')
const { between, lighten } = require('polished')

module.exports = {
  theme: {
    extend: {
      spacing: {
        md: '1.25rem', // margin between p's
        lg: '2rem', // between figures
        xl: '3rem', // dunno
        xxl: '4rem', // between H2sections
      },
      modscale: {
        sm: { ratio: 1.14, linebase: 1.6, lineratio: 0.957 },
        md: { ratio: 1.18, linebase: 1.6, lineratio: 0.957 },
      },
      colors: {
        //  Brand A
        a: {
          '500': '#705075',
          '300': lighten(0.2, '#705075'),
        },
        // Code background
        window: {
          text: '#8a8ab1',
          base: '#30304b',
          title: '#2b2b41',
          line: '#8181e055',
        },
        // Neutral
        n: {
          bold: '#111111',
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
            `0 0 1px rgba(0, 0, 80, 0.3)`,
            `0 0px 1px rgba(0, 0, 80, 0.05)`,
            `0 2px 2px rgba(0, 0, 80, 0.05)`,
            `0 4px 4px rgba(0, 0, 80, 0)`,
            `0 8px 8px rgba(0, 0, 80, 0)`,
            `0 16px 16px rgba(0, 0, 80, 0)`,
          ].join(', '),
        },

        '.shadow-16': {
          boxShadow: [
            `0 0 1px rgba(0, 0, 80, 0.1)`,
            `0 0px 1px rgba(0, 0, 80, 0.06)`,
            `0 2px 2px rgba(0, 0, 80, 0.06)`,
            `0 4px 4px rgba(0, 0, 80, 0.02)`,
            `0 8px 8px rgba(0, 0, 80, 0.02)`,
          ].join(', '),
        },

        '.shadow-32': {
          boxShadow: [
            `0 0 1px rgba(0, 0, 180, 0.1)`,
            `0 0px 1px rgba(0, 0, 80, 0.06)`,
            `0 2px 2px rgba(0, 0, 80, 0.06)`,
            `0 4px 4px rgba(0, 0, 80, 0.06)`,
            `0 8px 8px rgba(0, 0, 80, 0.06)`,
            `0 16px 16px rgba(0, 0, 80, 0.06)`,
          ].join(', '),
        },

        '.type-body-sans': {
          fontFamily: "'Public Sans', Roboto, sans-serif",
        },

        '.type-body-sans-x': {
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

        '.type-monospace': {
          fontSize: '0.85em',
          fontFamily: "'Fira Mono', 'Roboto Mono', cousine, monospace",
          lineHeight: '1.3',
          letterSpacing: '-0.04em',
        },

        '.small-font': {
          fontSize: '0.82em',
        },
      })
    }),
    require('./src/tailwind-responsive-modular-scale').plugin(),
  ],
}
