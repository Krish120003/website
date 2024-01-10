import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
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
        // sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
