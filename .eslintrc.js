module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },

  extends: ['eslint:recommended', 'plugin:react/recommended'],

  parserOptions: {
    ecmaVersion: 2018,

    // Allows 'import' and 'export'
    sourceType: 'module',

    // ALlows JSX syntax for React
    ecmaFeatures: { jsx: true }
  },

  plugins: ['react', '@typescript-eslint/eslint-plugin'],
  settings: {
    react: {
      version: '16.5.0'
    }
  },
  rules: {
    'react/prop-types': 0
  },

  parser: '@typescript-eslint/parser'
}
