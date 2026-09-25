/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shuffle: {
          bg: "#0a0a0f",
          bg2: "#111119",
          bg3: "#1a1a27",
          card: "#1e1e2e",
          border: "#2a2a3e",
          purple: "#7717ff",
          purpleLight: "#8b3dff",
          purpleDark: "#5a0fd4",
          text: "#ffffff",
          textMuted: "#8b8ba7",
          textDim: "#5a5a7a",
        }
      },
      fontFamily: {
        sans: ["Aeonik", "var(--font-shuffle)", "system-ui", "sans-serif"],
        display: ["Aeonik", "var(--font-shuffle)", "sans-serif"],
      },
      borderRadius: {
        'card': '12px',
        'card-lg': '16px',
      }
    },
  },
  plugins: [],
}
