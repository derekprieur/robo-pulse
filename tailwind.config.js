/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      backgroundColor: {
        'primary': '#0D47A1',
        'background': '#F5F5F5',
      },
      textColor: {
        'primary': '#212121',
        'secondary': '#757575',
        'alternative': '#E91E63',
      },

    },
  },
  plugins: [],
}
