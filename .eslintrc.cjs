module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
    'plugin:perfectionist/recommended-natural',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'react/jsx-filename-extension': ['off'],
    'import/extensions': ['off'],
    'import/no-extraneous-dependencies': ['off'],
  },
};
