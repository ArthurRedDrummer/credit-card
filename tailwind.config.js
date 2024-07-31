/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: {
          max: '768px',
        }
      }
    },
  },
  plugins: [],
}

