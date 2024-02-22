const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
  colors: {
    'text': '#0e151b',
    'background': '#f0f5fa',
    'primary': '#4294d6',
    'secondary': '#8bc5f2',
    'accent': '#38a5fb',
   },
   
}

