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
        primaryLight: "#a78bfa",
        primaryDark: "#774fef"
      },
      fontFamily: {
        azeret: ['Azeret Mono', 'Roboto', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif']
      },
      accentColor: {
        primary: "#8b5cf6",
      },
      width: {
        '75ch': '75ch'
      }
    },
  },
  plugins: [],
}

