/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        scriptlatin: ["CochocibScriptLatinPro", "Roboto"],
      },
      colors: {
        primary: "rgba(35,55,87,1)",
      },
    },
  },
  plugins: [],
};
