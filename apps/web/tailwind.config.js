/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#111111",
        tertiary: "#222222",
      },
      backgroundImage: {
        "hero-bg": "url('/herobg.png')",
        "about-bg": "url('/aboutBg.png')",
      },
    },
  },
  plugins: [],
};
