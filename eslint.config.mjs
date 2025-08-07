// @ts-check

import stylistic from '@stylistic/eslint-plugin';
import perfectionist from 'eslint-plugin-perfectionist';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  {
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
      // Disabled rules
      'import/no-named-as-default-member': 'off',
      'no-console': [
        'error',
        {
          allow: [
            'info',
            'warn',
            'trace',
            'error',
            'group',
            'groupEnd',
            'time',
            'timeEnd',
          ],
        },
      ],
      'no-unused-vars': [
        'error',
        {
          args: 'after-used',
          ignoreRestSiblings: false,
          vars: 'all',
        },
      ],
    },
  },

  stylistic.configs.customize({
    commaDangle: 'always-multiline',
    indent: 2,
    quotes: 'single',
    semi: true,
  }),

  // @link https://perfectionist.dev/configs/recommended-alphabetical
  perfectionist.configs['recommended-alphabetical'],
]);
