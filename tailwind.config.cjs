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
      },
      keyframes: {
        "appear-bottom-keyframes": {
          "0%": { transform: "translateY(2ex)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
