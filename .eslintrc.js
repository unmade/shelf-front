module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  ignorePatterns: [
    'build/**/*',
  ],
  rules: {
    'react/prop-types': 0,
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: 5,
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          minProperties: 5,
          multiline: true,
          consistent: true,
        },
        ImportDeclaration: {
          minProperties: 4,
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          minProperties: 4,
          multiline: true,
          consistent: true,
        },
      },
    ],
  },
};