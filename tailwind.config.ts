import type { Config } from "tailwindcss"
import animatePlugin from "tailwindcss-animate"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1e3a5f",
          secondary: "#d4af37",
          dark: "#0f1f3a",
          light: "#f8fafc",
          accent: "#3b82f6",
        },
      },
    },
  },
  plugins: [animatePlugin],
}

export default config
