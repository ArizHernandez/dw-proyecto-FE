// tailwind.config.js
const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|button|card|chip|date-picker|dropdown|image|input|modal|navbar|table|ripple|spinner|calendar|date-input|popover|menu|divider|checkbox|spacer).js"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
