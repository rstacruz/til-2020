// https://tailwindcss.com/docs/configuration/
module.exports = {
  theme: {
    extend: {
      modscale: {
        sm: { ratio: 1.14, linebase: 1.6, lineratio: 0.957 },
        md: { ratio: 1.18, linebase: 1.6, lineratio: 0.957 }
      },
      colors: {
        a: {
          '500': '#705075'
        },
        n: {
          mute: '#5b687a',
          faded: '#718096',
          line: '#cbd5e0'
        }
      }
    }
  },
  variants: {},
  plugins: []
}
