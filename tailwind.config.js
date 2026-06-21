/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: "#FFF1F7",
        ink: "#3B2A3F",
        coral: "#EC4899",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      lineClamp: {
        2: "2",
      },
    },
  },
  plugins: [],
};
