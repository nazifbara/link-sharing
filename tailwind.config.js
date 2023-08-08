/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      base: ['Instrument Sans', 'sans-serif']
    },
    colors: {
      contrast: {
        base: '#737373',
        dark: '#333333',
      }
    },
    extend: {},
  },
  plugins: [],
}

