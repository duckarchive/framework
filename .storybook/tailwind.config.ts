import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "../components/**/*.{ts,tsx}",
    "./**/*.{ts,tsx}",
    "../node_modules/@heroui/*/dist/**/*.{js,mjs}",
  ],
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
