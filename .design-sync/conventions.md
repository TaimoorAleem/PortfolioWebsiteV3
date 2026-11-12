# Portfolio UI: conventions

A dark, game-menu style UI kit (Taimoor Aleem's portfolio). Components come from `window.PortfolioUI` and are styled by global CSS classes plus CSS custom properties. There are no providers or themes to set up.

## Setup

- **No wrapper component.** Components style themselves once `styles.css` is loaded. That file `@import`s `_ds_bundle.css`, which holds the tokens, the component classes and the Saira webfont import.
- **Always build on a dark surface.** Text is near-white and every component assumes a dark background behind it. `body` already gets `background: var(--c-page)` and `font-family: var(--f-ui)`. For full screens, use one of the scene gradients: `background: var(--scene-dark)` for content pages, `var(--scene-home)` for the warm hero, `var(--scene-comms)` for the alt hue.
- **Font.** One family, Saira, everywhere (`--f-ui`, `--f-display` and `--f-mono` all resolve to it). Don't introduce other fonts.

## Styling idiom: tokens via `var(--*)`

Lay out your own glue with plain CSS (flex/grid, inline styles). Colour it **only** with these tokens:

| Role | Tokens |
| --- | --- |
| Surfaces | `--c-page` (page), `--c-panel` (large panels), `--c-panel-soft` (headers, rows), `--c-stat` (tiles), `--c-bar` (list cells), `--c-card` |
| Text | `--c-text` (primary), `--c-muted` (secondary), `--c-faint` (tertiary) |
| Accents | `--c-gold` (titles, awards, featured), `--c-amber` (selection bars, meters, hover), `--c-blue` (sub-labels, links), `--c-new` (green NEW), `--c-alert` (red) |
| Selected state | `--c-selected` background with `--c-on-selected` text (light fill, dark text) |
| Lines | `--c-hair` (1px rules) |
| Theme knob | `--hue`: background family in OKLCH degrees (25 = red). Change it only to re-theme the whole kit. |

**Signature shape:** every clickable button or cell has a cut-out bottom-right corner:
`clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)`.
Non-clickable tiles keep square corners. `CutCornerButton`, `ListBar`, `SettingsRow`, `SubOptionRow` and the award rows already do this.

Other conventions:
- Headings are uppercase and bold (`SectionHeader`, `MenuItem`, `ChapterCard`).
- Hover colours change instantly, with no transitions.
- Awards use `Trophy` icons in gold.

## Where the truth lives

- Read `_ds_bundle.css` before styling: it has the full token list at the top, then every component class.
- Per-component API: `components/general/<Name>/<Name>.d.ts`. Usage examples: `<Name>.prompt.md`.
- Award rows are styled markup rather than a component: `.proj-awards` › `.proj-award` with `.proj-award__result`, `.proj-award__event` and `.proj-award__year`, plus a `Trophy` given `className="trophy proj-award__icon"`.

## Example

```jsx
const { SectionHeader, ListBar, TrophyCount, CutCornerButton, AbilityCard } = window.PortfolioUI;

<div style={{ background: 'var(--scene-dark)', padding: 32, display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24 }}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    <ListBar label="Ember" featured selected trailing={<TrophyCount n={3} />} />
    <ListBar label="Proprio" featured isNew />
  </div>
  <div style={{ background: 'var(--c-panel)', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
    <span style={{ color: 'var(--c-gold)', fontSize: 24, fontWeight: 600 }}>XR FIREFIGHTER HELMET</span>
    <SectionHeader>FEATURES</SectionHeader>
    <AbilityCard inline index={1} title="LIVE HELMET FEED" desc="Streams the helmet camera to the commander's HUD." />
    <CutCornerButton href="#">GITHUB</CutCornerButton>
  </div>
</div>
```
