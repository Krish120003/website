/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      animation: {
        "appear-bottom": "appear-bottom-keyframes 1s ease forwards",
        "fade-in": "opacity-fade 0.8s linear forwards",
        "pulse-full": "pulse-full 1s ease-in-out infinite",
      },
      keyframes: {
        "appear-bottom-keyframes": {
          "0%": { transform: "translateY(2.25ex)" },
          "100%": { transform: "translateY(0)" },
        },
        "opacity-fade": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "pulse-full": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.1 },
        },
      },
      colors: {
        // setup a primary color
        primary: "#914DC4",
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
