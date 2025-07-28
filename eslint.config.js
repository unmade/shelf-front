/* eslint-disable @typescript-eslint/no-require-imports, import/no-extraneous-dependencies */
const { defineConfig, globalIgnores } = require('eslint/config');

const globals = require('globals');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const react = require('eslint-plugin-react');
const prettier = require('eslint-plugin-prettier');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          tsx: true,
        },
      },
    },

    extends: compat.extends(
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'airbnb',
      'prettier',
    ),

    plugins: {
      '@typescript-eslint': typescriptEslint,
      react,
      prettier,
    },

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

      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['state'],
        },
      ],

      'no-unused-vars': 'off',
      'prettier/prettier': 'error',

      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],

      'react/prop-types': 0,
      'react/require-default-props': 0,
    },

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
  },
  globalIgnores(['build/**/*', 'dist/**/*', 'node_modules/**/*']),
  {
    files: ['**/*.ts', '**/*.tsx'],

    rules: {
      'no-undef': 'off',
    },
  },
]);
