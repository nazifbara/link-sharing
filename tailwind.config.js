/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      base: ['Instrument Sans', 'sans-serif']
    },
    colors: {
      primary: {
        base: '#633CFF',
        hover: '#BEADFF',
        light: '#EFEBFF',
      },
      danger: '#FF3939',
      contrast: {
        base: '#737373',
        dark: '#333333',
      },
      border: '#D9D9D9',
      surface: '#FFFFFF',
    },
    extend: {},
  },
  plugins: [],
}

