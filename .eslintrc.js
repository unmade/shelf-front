module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  ignorePatterns: ['build/**/*'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'no-unused-vars': 'off',
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/prop-types': 0,
    'react/require-default-props': 0,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['components', './src/components'],
          ['constants', './src/constants.ts'],
          ['containers', './src/contrainers'],
          ['hooks', './src/hooks'],
          ['icons', './src/icons'],
          ['pages', './src/pages'],
          ['routes', './src/routes'],
          ['store', './src/store'],
          ['types', './src/types'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
      typescript: {},
    },
  },
};
