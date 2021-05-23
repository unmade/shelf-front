// tailwind.config.js
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      blue: colors.blue,
      emerald: colors.emerald,
      gray: colors.gray,
      green: colors.green,
      indigo: colors.indigo,
      orange: colors.orange,
      red: colors.red,
      rose: colors.rose,
      teal: colors.teal,
      white: colors.white,
      yellow: colors.amber,
    },
    extend: {
      animation: {
        'toast-in-right': 'toast-in-right .3s ease-in-out',
      },
      keyframes: {
        'toast-in-right': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      maxWidth: {
        '2xs': '10rem',
        '1.5xs': '15rem',
        '3xs': '6rem',
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
