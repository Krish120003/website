import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx", "./src/**/*.ts"],
  theme: {
    extend: {
      animationDelay: {
        "-5000": "-5000ms",
        100: "100ms",
      },
      animation: {
        "spin-30s": "spin 30s linear infinite",
        "spin-20s": "spin 20s linear infinite",
      },
      fontFamily: {
        serif: ["Libre Caslon Text", ...fontFamily.serif],
        "serif-condensed": ["Libre Caslon Condensed", ...fontFamily.serif],
      },
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
