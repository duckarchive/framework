import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "../components/**/*.{ts,tsx}",
    // Stories declare their own layout/color utilities (wrappers, galleries),
    // so they must be scanned too — otherwise those classes are never emitted.
    "../stories/**/*.{ts,tsx}",
    "./**/*.{ts,tsx}",
    "../node_modules/@heroui/*/dist/**/*.{js,mjs}",
  ],
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
