/** @type {import('tailwindcss').Config} */
module.exports = {
  // Scan Expo Router and source files where className utilities are used.
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.ts"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}