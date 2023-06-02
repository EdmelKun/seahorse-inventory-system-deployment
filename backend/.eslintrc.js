module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:jest/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
};
