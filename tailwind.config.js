const colors = require('tailwindcss/colors');
const forms = require('@tailwindcss/forms');
const plugin = require('tailwindcss/plugin');
const postcss = require('postcss');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      amber: colors.amber,
      black: colors.black,
      blue: colors.blue,
      emerald: colors.emerald,
      gray: colors.gray,
      green: colors.green,
      indigo: colors.indigo,
      orange: colors.orange,
      purple: colors.purple,
      red: colors.red,
      rose: colors.rose,
      teal: colors.teal,
      white: colors.white,
      zinc: colors.zinc,
    },
    extend: {
      animation: {
        'toast-in-right': 'toast-in-right .3s ease-in-out',
        gradient: 'gradient 3s ease infinite',
      },
      keyframes: {
        'toast-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0%)' },
        },
        gradient: {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
      },
      margin: {
        '-5.75': '-1.45rem',
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
    forms,
    plugin(({ addVariant, e }) => {
      addVariant('pointer-coarse', ({ container, separator }) => {
        const pointerFine = postcss.atRule({ name: 'media', params: '(pointer: coarse)' });
        pointerFine.append(container.nodes);
        container.append(pointerFine);
        pointerFine.walkRules((rule) => {
          // eslint-disable-next-line no-param-reassign
          rule.selector = `.${e(`pointer-coarse${separator}${rule.selector.slice(1)}`)}`;
        });
      });
      addVariant('pointer-fine', ({ container, separator }) => {
        const pointerFine = postcss.atRule({ name: 'media', params: '(pointer: fine)' });
        pointerFine.append(container.nodes);
        container.append(pointerFine);
        pointerFine.walkRules((rule) => {
          // eslint-disable-next-line no-param-reassign
          rule.selector = `.${e(`pointer-fine${separator}${rule.selector.slice(1)}`)}`;
        });
      });
    }),
  ],
};
