/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ayur-green': '#16a34a', // green-600
        'ayur-blue': '#2563eb',  // blue-600
      },
    },
  },
  plugins: [],
}
