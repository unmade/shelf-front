// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
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
      },
      minWidth: {
        '1.5xs': '15rem',
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
  ],

  variants: {
    extend: {
      backgroundColor: ['odd'],
    },
  },
};
