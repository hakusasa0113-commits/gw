import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-raised": "var(--paper-raised)",
        "paper-subtle": "var(--paper-subtle)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        slate: "var(--slate)",
        line: "var(--line)",
        blue: { DEFAULT: "var(--blue)", dim: "var(--blue-dim)", soft: "var(--blue-soft)" },
        purple: { DEFAULT: "var(--purple)", dim: "var(--purple-dim)", soft: "var(--purple-soft)" },
        mint: { DEFAULT: "var(--mint)", dim: "var(--mint-dim)", soft: "var(--mint-soft)" },
        amber: { DEFAULT: "var(--amber)", dim: "var(--amber-dim)", soft: "var(--amber-soft)" },
        pink: { DEFAULT: "var(--pink)", soft: "var(--pink-soft)" },
        red: { DEFAULT: "var(--red)", soft: "var(--red-soft)" },
        teal: { DEFAULT: "var(--teal)", soft: "var(--teal-soft)" },
        orange: { DEFAULT: "var(--orange)", soft: "var(--orange-soft)" },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: { "2xl": "20px", xl: "16px", lg: "12px", md: "8px" },
      boxShadow: {
        card: "0 1px 3px rgba(13,27,42,0.06), 0 4px 16px rgba(13,27,42,0.06)",
        "card-hover": "0 8px 30px rgba(79,110,247,0.14), 0 2px 8px rgba(13,27,42,0.08)",
        "card-active": "0 2px 8px rgba(79,110,247,0.2)",
        glow: "0 0 0 3px var(--blue-glow)",
        "glow-purple": "0 0 0 3px rgba(144,97,249,0.2)",
        nav: "0 1px 0 var(--line), 0 4px 24px rgba(13,27,42,0.04)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-cool": "var(--gradient-cool)",
        "gradient-warm": "var(--gradient-warm)",
        "gradient-success": "var(--gradient-success)",
        "gradient-hero": "var(--gradient-hero)",
      },
      animation: {
        "fade-up": "fadeUp 0.45s ease forwards",
        "fade-in": "fadeIn 0.3s ease forwards",
        "scale-in": "scaleIn 0.3s ease forwards",
        "slide-left": "slideInLeft 0.4s ease forwards",
        float: "float 4s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
        "gradient-shift": "gradientShift 6s ease infinite",
      },
      keyframes: {
        fadeUp: { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        scaleIn: { from: { opacity: "0", transform: "scale(0.96)" }, to: { opacity: "1", transform: "scale(1)" } },
        slideInLeft: { from: { opacity: "0", transform: "translateX(-20px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        float: { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
        "pulse-dot": { "0%,100%": { opacity: "1", transform: "scale(1)" }, "50%": { opacity: "0.5", transform: "scale(0.8)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        gradientShift: { "0%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" }, "100%": { backgroundPosition: "0% 50%" } },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [],
};
export default config;
