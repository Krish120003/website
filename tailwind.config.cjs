/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        texture: "url('/Texture.webp')",
      },
      animation: {
        "appear-bottom": "appear-bottom-keyframes 1s ease forwards",
        "fade-in": "opacity-fade 0.8s linear forwards",
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
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
