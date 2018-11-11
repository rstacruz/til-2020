const ENV = process.env || {}
const IS_TEST =
  ENV.NODE_ENV === 'test' || typeof ENV.JEST_WORKER_ID !== 'undefined'

module.exports = {
  presets: [
    '@babel/preset-flow',
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: 'commonjs',
        useBuiltIns: 'usage',
        shippedProposals: true,
        targets: {
          browsers: ['>0.25%', 'not dead'],
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        useBuiltIns: true,
        pragma: 'React.createElement',
      },
    ],
  ],
  plugins: [
    ['styled-jsx/babel', { plugins: ['styled-jsx-plugin-postcss'] }],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-macros',
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: true,
        regenerator: true,
      },
    ],
  ],
}
