// tailwind.config.js
const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|card|date-picker|input|navbar|table|ripple|spinner|calendar|date-input|popover|checkbox|spacer).js"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
