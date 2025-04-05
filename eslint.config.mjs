import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  prettierConfig, // ✅ Disables ESLint rules that conflict with Prettier
  {
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'error', // ✅ Runs Prettier as an ESLint rule
      'no-process-env': 'off', // ✅ Allow process.env
    },
  },
];
