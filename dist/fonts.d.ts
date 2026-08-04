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
export declare const fontSans: import("next/dist/compiled/@next/font").NextFontWithVariable;
export declare const fontMono: import("next/dist/compiled/@next/font").NextFontWithVariable;
/** All four CSS variable classes, ready to drop on <body>. */
export declare const fontVariables: string;
