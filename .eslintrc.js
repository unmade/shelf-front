module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  ignorePatterns: ['build/**/*'],
  rules: {
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'prettier/prettier': 'error',
    'react/prop-types': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['components', './src/components'],
          ['constants', './src/constants.js'],
          ['hooks', './src/hooks'],
          ['icons', './src/icons'],
          ['routes', './src/routes'],
          ['store', './src/store'],
          ['types', './src/types.js'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
