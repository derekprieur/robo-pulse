/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      backgroundColor: {
        'primary': '#0D47A1',
        'secondary': '#E91E63',
        'background': '#F5F5F5',
      },
      textColor: {
        'primary': '#212121',
        'secondary': '#757575',
      },

    },
  },
  plugins: [],
}
