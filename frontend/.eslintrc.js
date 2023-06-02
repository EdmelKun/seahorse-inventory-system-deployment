module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jest', '@typescript-eslint', 'prettier'],
  rules: {
    'linebreak-style': 0,
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'prettier/prettier': ['error'],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
};
