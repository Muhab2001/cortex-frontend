/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  prefix: "t-",
  darkMode: "class",
  corePlugins: {
    preflight: false,
  },
  important: true,
  plugins: [
    require("@tailwindcss/line-clamp"),
    // ...
  ],
};
