/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)"],

        // Poppins
        poppins: ["var(--font-poppins)"],

        // Brighter / MTN
        brighter: ["var(--font-brighter)"],

        // NotoSans
        noto: ["var(--font-noto)"],
      },
    },
  },
  plugins: [],
};
