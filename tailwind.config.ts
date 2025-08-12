import type { Config } from 'tailwindcss';

import plugin from 'tailwindcss/plugin';

export default <Partial<Config>>{
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.bordered': {
          '@apply rounded border border-border dark:border-border-dark': {},
        },
      });
    }),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#302aa7',
      },
      fontFamily: {
        roslindale: ['Roslindale', 'sans-serif'],
      },
    },
  },
};
