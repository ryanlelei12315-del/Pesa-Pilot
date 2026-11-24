/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0a0e21",
        charcoal: "#1a1a2e",
        emerald: "#10b981",
        muted: "#6b7280",
        border: "#2a2a3e",
      },
    },
  },
  plugins: [],
}
