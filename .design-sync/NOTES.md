# design-sync notes: PortfolioWebsiteV3

## How this repo syncs
- **The site isn't a package**, so `.design-sync/build-lib.mjs` (`cfg.buildCmd`) builds `src/components` into `ds-lib/` (gitignored). The build makes:
  - an esbuild ESM bundle;
  - a tsc `.d.ts` tree;
  - `styles.css`: the Saira Google Fonts `@import`, then `tokens.css`, `components.css` and `cut.css`, concatenated;
  - a stub `package.json` (`portfolio-ui`).

  Re-run it before every sync.
- **Converter command:**
  `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./ds-lib/index.js --out ./ds-bundle`
- **Rendering browser.** No Playwright browser is downloaded; the system Chrome is used instead. Set `DS_CHROMIUM_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe"` for validate and capture. If it's missing, capture fails with "Executable doesn't exist ... chrome-headless-shell". Playwright itself was installed with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`.
- **Dark backgrounds.** Every component assumes a dark background, and `body` gets `var(--c-page)` from `tokens.css`. Each preview wraps its cells in a local `Stage` div (`background: var(--c-page)`).
- **Overlay cards.** `LoadingScreen` and `SlideshowOverlay` are `position: absolute; inset: 0` overlays. Their previews render them inside a sized relative box, with `cardMode: single` plus a viewport in `cfg.overrides`.
- **`NewsTicker`** concatenates `lead` and `hl` with no space, so callers must end `lead` with a space.
- **`Meter`** is absolutely positioned at the bottom of its parent, so it needs a `position: relative` tile around it.

## Known render warns
- None after authoring. On the floor cards, `ChapterCard`/`ResultCard`/`SettingsRow`/`StatTile` were `[RENDER_THIN]` and several small components were `[RENDER_BLANK]`. All 32 now have authored previews.

## Re-sync risks
- **Hardcoded style files.** `build-lib.mjs` concatenates three style files by name (`tokens.css`, `components.css`, `cut.css`). Component styles moved into another file (e.g. `desktop.css`/`mobile.css`) won't reach the design system until that list is updated.
- **Hardcoded component list.** The library entry is `src/components/index.ts`. Components that live only in `src/shared/` (`Hobbies`, `Gallery`, `EventRow`) or in the screens aren't synced.
- **Remote font.** Saira loads from Google Fonts at runtime (`[FONT_REMOTE]`), so designs need network access for the brand font.
- **Group.** Every component is in the single group `general`; there's no docs tree. Add `docsMap` stubs with `category:` frontmatter to regroup.
- **Placeholder media.** Slideshow and media previews use hatched placeholders (no real images in the bundle).
