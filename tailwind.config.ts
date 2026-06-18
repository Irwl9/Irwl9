import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          bg: "#EEF2FF",
          surface: "#FFFFFF",
          primary: "#7C6FF7",
          "primary-dark": "#6356D5",
          secondary: "#FF8FAB",
          accent: "#5ECFB1",
          warn: "#FFBF69",
          text: "#1E1B4B",
          muted: "#64748B",
        },
      },
      borderRadius: {
        clay: "20px",
        "clay-lg": "28px",
        "clay-xl": "36px",
      },
      boxShadow: {
        clay: "6px 6px 0px 0px #C4BFEF, inset 0 1px 0 rgba(255,255,255,0.8)",
        "clay-sm": "3px 3px 0px 0px #C4BFEF, inset 0 1px 0 rgba(255,255,255,0.8)",
        "clay-pink": "6px 6px 0px 0px #FFBFCE, inset 0 1px 0 rgba(255,255,255,0.8)",
        "clay-mint": "6px 6px 0px 0px #A8EEE0, inset 0 1px 0 rgba(255,255,255,0.8)",
        "clay-hover": "8px 8px 0px 0px #B8B2E8, inset 0 1px 0 rgba(255,255,255,0.9)",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "Nunito", "system-ui", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 2s infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
