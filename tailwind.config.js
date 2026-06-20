/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: "#FBF6EC",
        ink: "#1C2B2A",
        coral: "#F4623A",
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
