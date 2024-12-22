/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color:{
        primary: "#F5EFFF",
        secondary: "#E5D9F2",
        accent: "#CDC1FF",
        higher: "#A294F9"
      },
      fontFamily:{
        cabin:["Cabin Sketch", "serif"]
      }
    },
  },
  plugins: [ require('daisyui'),],
}

