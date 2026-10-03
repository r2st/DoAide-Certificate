/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        'great-vibes': ['"Great Vibes"', 'cursive'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        dancing: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        doaide: {
          gold: '#F0B429',
          dark: '#1a1a2e',
        },
      },
    },
  },
  plugins: [],
};
