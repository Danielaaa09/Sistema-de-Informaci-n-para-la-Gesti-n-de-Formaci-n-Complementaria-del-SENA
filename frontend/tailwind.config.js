/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      },
      colors: {
        sena: {
          verde: '#00995D',
          gris: '#404041',
          claro: '#F4F4F4'
        }
      }
    }
  },
  plugins: [],
}
