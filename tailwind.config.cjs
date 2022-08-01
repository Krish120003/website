/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        texture: "url('/Texture.webp')",
      },
    },
  },
  plugins: [],
};
