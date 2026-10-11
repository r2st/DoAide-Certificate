/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
        'great-vibes': ['"Great Vibes"', 'cursive'],
        dancing: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        da: {
          teal: '#0D9488',
          'teal-dark': '#0F766E',
          'teal-light': '#14B8A6',
          dark: '#111827',
          'dark-soft': '#1F2937',
        },
      },
    },
  },
  plugins: [],
};
