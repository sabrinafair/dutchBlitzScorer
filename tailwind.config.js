/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
  keyframes: {
    'fadeIn': {
      '0%': { opacity: 0 },
      '20%': { opacity: 1 },
      '70%': { opacity: 1 },
      '100%': { opacity: 0 },
    },
    'popUp': {
      '0%': {transform: 'scale(0)'},
      '100%': { transform: 'scale(1)' },     
    }
  },
  animation: {
    'fade': 'fadeIn 2s ease-in-out',
    'snack': 'popUp 1s ease-in-out infinite'
  },
},
},
  plugins: [],
}