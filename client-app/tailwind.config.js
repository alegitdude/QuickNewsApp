/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#29231D",
        accent: "#97AFAF",
        background: "#FEFBF6",
      },
    },
  },

  plugins: [],
};
