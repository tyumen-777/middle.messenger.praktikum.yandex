module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
  },
};
