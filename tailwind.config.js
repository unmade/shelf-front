// tailwind.config.js
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      blue: colors.blue,
      white: colors.white,
      gray: colors.gray,
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.amber,
      orange: colors.orange,
    },
    extend: {
      animation: {
        'toast-in-right': 'toast-in-right .3s',
      },
      keyframes: {
        'toast-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      maxWidth: {
        '2xs': '10rem',
      },
      minWidth: {
        '1.5xs': '15rem',
      },
    },
  },

  plugins: [
    plugin(({ addUtilities }) => {
      const utilities = {
        '.drop-shadow': {
          filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1))',
        },
      };

      addUtilities(utilities, ['hover']);
    }),
    plugin(({ addUtilities }) => {
      const utilities = {
        '.blur': {
          backdropFilter: 'blur(1px)',
        },
      };

      addUtilities(utilities);
    }),
  ],
};
