/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8b5cf6",
        primaryLight: "#a78bfa"
      },
      fontFamily: {
        azeret: ['Azeret Mono', 'Roboto', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif']
      },
      spacing: {
        'top-calc': 'calc(16px + 100%)',
        'card-w': 'calc(25vw - 80px)'
      },
    },
  },
  plugins: [],
}

