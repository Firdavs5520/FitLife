/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        golos: ['"Golos Text"', "sans-serif"], // Golos Text fontini qo‘shdik
      },
    },
  },
  plugins: [],
};
