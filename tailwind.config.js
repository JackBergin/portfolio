/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-bg': '#f4f7fc',
        'dark-bg': '#1a1a1a',
        'light-text': '#333333',
        'dark-text': '#ffffff',
        'light-gradient-1': '#243b55',
        'light-gradient-2': '#141e30',
        'dark-gradient-1': '#141e30',
        'dark-gradient-2': '#0f172a',
      },
    },
  },
  plugins: [],
};
