import { Geist, Geist_Mono } from "next/font/google";
// import localFont from "next/font/local";
/**
 * Shared Duck Archive typography.
 *
 * These are `next/font` loaders, resolved at build time by the consuming
 * Next.js app's compiler — so the app must list `@duckarchive/framework` in
 * `transpilePackages` (next.config.js) for the font transform to run over this
 * file. Without it, Next leaves the `localFont(...)` / `Geist(...)` calls
 * untransformed and they throw at runtime.
 *
 * Every argument below has to stay an explicitly written literal (no template
 * strings, no shared path constants, no spreads) — the SWC transform reads
 * these statically and fails on anything it can't evaluate.
 *
 * `src` paths are relative to this module, so the .otf/.ttf assets ship inside
 * the package (`assets/fonts`, mirrored into `dist/` by the build).
 */
// body copy, headings — DESIGN.md `font-sans`
// export const fontSans = localFont({
//   src: [
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-Thin.otf", weight: "100", style: "normal" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-ThinItalic.otf", weight: "100", style: "italic" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-Ultralight.otf", weight: "200", style: "normal" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-UltralightItalic.otf", weight: "200", style: "italic" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-Light.otf", weight: "300", style: "normal" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-LightItalic.otf", weight: "300", style: "italic" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-Regular.otf", weight: "400", style: "normal" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-RegularItalic.otf", weight: "400", style: "italic" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-Medium.otf", weight: "500", style: "normal" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-MediumItalic.otf", weight: "500", style: "italic" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-Semibold.otf", weight: "600", style: "normal" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-SemiboldItalic.otf", weight: "600", style: "italic" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-Bold.otf", weight: "700", style: "normal" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-BoldItalic.otf", weight: "700", style: "italic" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-Heavy.otf", weight: "800", style: "normal" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-HeavyItalic.otf", weight: "800", style: "italic" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-Black.otf", weight: "900", style: "normal" },
//     { path: "./assets/fonts/San-Francisco-Pro/SF-Pro-Text-BlackItalic.otf", weight: "900", style: "italic" },
//   ],
//   variable: "--font-sans",
// });
// labels, chips, metadata — DESIGN.md `font-label`
export const fontSans = Geist({
    subsets: ["latin", "cyrillic"],
    variable: "--font-sans",
});
// archival codes, tabular data points — DESIGN.md `font-mono`
export const fontMono = Geist_Mono({
    subsets: ["latin", "cyrillic"],
    variable: "--font-mono",
});
// comics cards — DESIGN.md `font-comic`
// export const fontComic = localFont({
//   src: "./assets/fonts/CCJimLee/CCJimLee.ttf",
//   variable: "--font-comic",
// });
/** All four CSS variable classes, ready to drop on <body>. */
export const fontVariables = [
    fontSans.variable,
    // fontLabel.variable,
    fontMono.variable,
    // fontComic.variable,
].join(" ");
