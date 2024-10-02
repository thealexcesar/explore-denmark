/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        'denmark-blue': '#004b87',
        'denmark-dark': '#1a1a1a',
        'denmark-light': '#f0f4f8',
        'denmark-link': '#4493f8',
        'denmark-red': '#c8102e',
      },
    },
  },
  plugins: [],
}
