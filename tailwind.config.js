/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors")

module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    fontFamily: {
      // sans: ["AtkinsonHyperlegible"],
      // serif: ["AtkinsonHyperlegible"],
      // mono: ["AtkinsonHyperlegible"],
      // display: ["AtkinsonHyperlegible"],
      // body: ["AtkinsonHyperlegible"]
      'atkinson': ['AtkinsonHyperlegible']
    },
    extend: {
      screens: {
        'xs': '360px',
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }

      },
      colors: {
        "vtd-primary": colors.sky,
        "vtd-secondary": colors.gray,
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
}
