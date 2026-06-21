/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Courier New'", "monospace"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      keyframes: {
        flash: {
          "0%": { opacity: 0 },
          "10%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        countdownPulse: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(1.4)", opacity: 0 },
        },
      },
      animation: {
        flash: "flash 0.4s ease-out",
        countdownPulse: "countdownPulse 0.6s ease-out",
      },
    },
  },
  plugins: [],
};
