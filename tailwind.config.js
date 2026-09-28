/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
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
        },
        /* ---- Casino Admin design tokens (dark-first) ---- */
        adm: {
          bg: "#0a0d14",        // app background
          panel: "#0f131d",     // sidebar / topbar
          card: "#131826",      // cards & surfaces
          card2: "#181e30",     // raised surface / hover
          inset: "#0c1018",     // recessed areas, table headers
          line: "#222a3d",      // borders
          line2: "#2d3650",     // stronger borders
          text: "#e9ecf5",      // primary text
          muted: "#8a93ab",     // secondary text
          dim: "#5b6478",       // tertiary text
          brand: "#8b5cf6",     // primary accent (violet)
          brand2: "#a78bfa",
          brandsoft: "#8b5cf61f",
          gold: "#f2b93b",      // casino gold highlight
          goldsoft: "#f2b93b1a",
          green: "#34d399",     // success / money in
          greensoft: "#34d39914",
          red: "#f4587a",       // danger / money out
          redsoft: "#f4587a14",
          amber: "#fbbf24",     // warning / pending
          ambersoft: "#fbbf2414",
          blue: "#4da3ff",      // info
          bluesoft: "#4da3ff14",
          cyan: "#22d3ee",
        },
      },
      fontFamily: {
        sans: ["Aeonik", "var(--font-shuffle)", "system-ui", "sans-serif"],
        display: ["Aeonik", "var(--font-shuffle)", "sans-serif"],
        admin: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        card: '12px',
        'card-lg': '16px',
        adm: '10px',
        'adm-lg': '14px',
        'adm-xl': '18px',
      },
      boxShadow: {
        adm: '0 1px 2px rgba(0,0,0,.4), 0 8px 24px -12px rgba(0,0,0,.5)',
        'adm-lg': '0 2px 6px rgba(0,0,0,.45), 0 16px 48px -16px rgba(0,0,0,.65)',
        'adm-glow': '0 0 0 1px rgba(139,92,246,.25), 0 8px 32px -8px rgba(139,92,246,.35)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-up': { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'slide-down': { from: { opacity: '0', transform: 'translateY(-4px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'scale-in': { from: { opacity: '0', transform: 'scale(.97)' }, to: { opacity: '1', transform: 'scale(1)' } },
        shimmer: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
        'pulse-dot': { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
        'drawer-in': { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
      },
      animation: {
        'fade-in': 'fade-in .18s ease-out',
        'slide-up': 'slide-up .24s cubic-bezier(.16,1,.3,1)',
        'slide-down': 'slide-down .18s ease-out',
        'scale-in': 'scale-in .14s ease-out',
        shimmer: 'shimmer 1.6s linear infinite',
        'pulse-dot': 'pulse-dot 1.8s ease-in-out infinite',
        'drawer-in': 'drawer-in .28s cubic-bezier(.16,1,.3,1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
