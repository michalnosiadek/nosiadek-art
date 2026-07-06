import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#f2ece6",
          muted: "#a89f97",
          faint: "#6f6862",
        },
        void: {
          DEFAULT: "#0a0908",
          raised: "#131110",
          line: "#211d1a",
        },
        dawn: {
          DEFAULT: "#7a1f1a",
          bright: "#b3291f",
          deep: "#451412",
        },
        moon: {
          DEFAULT: "#a25640",
          soft: "#c57756",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "Helvetica", "Arial", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
