/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        greenCustom: '#9ED0BA',
        blueCustom: '#C4DBF5',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["pastel"],
  },
};
