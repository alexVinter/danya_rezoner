/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F3EFEA',
        white: '#FFFFFF',
        slate: {
          DEFAULT: '#313A43',
          soft: '#585E64',
        },
        line: '#CCCBC9',
        orange: {
          DEFAULT: '#B15130',
          hover: '#9C472A',
        },
        pink: '#E3B5B3',
        lime: '#BBC65E',
        forest: '#263C2C',
        plum: '#36202C',
      },
      fontFamily: {
        sans: ['"Golos Text"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'plate': '32px',
        'card': '24px',
        'faq': '20px',
        'input': '14px',
        'pill': '999px',
      },
      maxWidth: {
        'site': '1280px',
      }
    },
  },
  plugins: [],
}
