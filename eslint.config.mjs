import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import { config, configs } from 'typescript-eslint';

const eslintConfig = config(
  {
    name: 'global-ignores',
    ignores: [
      '**/*.snap',
      '**/dist/',
      '**/node_modules/',
      '**/.yalc/',
      '**/build/',
      '**/temp/',
      '**/.temp/',
      '**/.tmp/',
      '**/.yarn/',
      '**/coverage/',
    ],
  },
  {
    name: `${js.meta.name}/recommended`,
    ...js.configs.recommended,
  },
  // configs.strictTypeChecked,
  configs.stylisticTypeChecked,
  configs.recommended,
  {
    name: 'eslint-plugin-react/jsx-runtime',
    ...reactPlugin.configs.flat['jsx-runtime'],
  },
  reactHooksPlugin.configs['recommended-latest'],
  jsxA11y.flatConfigs.recommended,
  {
    name: 'main',
    linterOptions: {
      reportUnusedDisableDirectives: 2,
    },
    languageOptions: {
      ecmaVersion: 12,
      globals: globals.browser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.mjs', '*.mts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-undef': [0],
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/consistent-type-imports': [
        2,
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
          disallowTypeAnnotations: true,
        },
      ],
    },
  },

  prettierConfig,
  eslintPluginPrettierRecommended,
);

export default eslintConfig;
