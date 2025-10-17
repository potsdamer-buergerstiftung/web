// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} \*/
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ['var(--font-header)', ...fontFamily.serif],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')
  ],
}