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
          bg: "#EDF5F0",
          surface: "#FFFFFF",
          primary: "#0B7A57",
          "primary-dark": "#075438",
          secondary: "#E0A82E",
          accent: "#34D8A6",
          warn: "#FFBF69",
          text: "#0A2620",
          muted: "#5A7268",
        },
        dark: {
          bg: "#04140E",
          card: "rgba(255,255,255,0.05)",
          border: "rgba(255,255,255,0.10)",
          muted: "rgba(255,255,255,0.45)",
        },
      },
      borderRadius: {
        clay: "20px",
        "clay-lg": "28px",
        "clay-xl": "36px",
      },
      boxShadow: {
        clay: "-6px 6px 0px 0px #9FD4BC, inset 0 1px 0 rgba(255,255,255,0.8)",
        "clay-sm": "-3px 3px 0px 0px #9FD4BC, inset 0 1px 0 rgba(255,255,255,0.8)",
        "clay-pink": "-6px 6px 0px 0px #F1DA9A, inset 0 1px 0 rgba(255,255,255,0.8)",
        "clay-mint": "-6px 6px 0px 0px #9DE9CE, inset 0 1px 0 rgba(255,255,255,0.8)",
        "clay-hover": "-8px 8px 0px 0px #86C7A8, inset 0 1px 0 rgba(255,255,255,0.9)",
        glow: "0 0 40px rgba(52,216,166,0.4), 0 0 80px rgba(52,216,166,0.15)",
        "glow-sm": "0 0 20px rgba(52,216,166,0.3)",
        "glow-pink": "0 0 40px rgba(224,168,46,0.3)",
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "Cairo", "system-ui", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "shimmer": "shimmer 2s linear infinite",
        "orb-drift": "orb-drift 15s ease-in-out infinite",
        "orb-drift-2": "orb-drift 18s ease-in-out 3s infinite reverse",
        "typing-dot": "typing-dot 1.4s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "spin-slow": "spin 8s linear infinite",
        "border-spin": "border-spin 6s linear infinite",
        "aurora-move": "aurora-move 18s ease infinite",
        "marquee": "marquee 28s linear infinite",
        "tilt": "tilt 8s ease-in-out infinite",
        "wiggle": "wiggle 3s ease-in-out infinite",
        "scroll-down": "scroll-down 1.8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(52,216,166,0.3), 0 0 60px rgba(52,216,166,0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(52,216,166,0.6), 0 0 100px rgba(52,216,166,0.2)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "orb-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(3%, 5%) scale(1.05)" },
          "50%": { transform: "translate(-3%, 8%) scale(0.98)" },
          "75%": { transform: "translate(5%, -3%) scale(1.02)" },
        },
        "typing-dot": {
          "0%, 60%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "30%": { transform: "translateY(-4px)", opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "border-spin": {
          "0%": { "--angle": "0deg" },
          "100%": { "--angle": "360deg" },
        },
        "aurora-move": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        tilt: {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-6deg)" },
          "75%": { transform: "rotate(6deg)" },
        },
        "scroll-down": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(10px)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
