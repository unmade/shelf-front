// tailwind.config.js
const { colors } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          75: 'hsla(204, 45%, 98%, 0.75)',
        },
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.drop-shadow': {
          filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1))',
        },
      };

      addUtilities(newUtilities, ['hover']);
    }),
  ],
};
