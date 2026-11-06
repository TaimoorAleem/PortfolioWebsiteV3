# Portfolio Website V3

Portfolio site implemented from the Claude Design project:

- **Desktop** (`Portfolio.dc.html`): windows at least 1024 × 600 get a 1440 × 900 canvas scaled to fit,
  driven by arrow keys and Enter, with Esc to go back (mouse works too).
- **Mobile + component library** (`Components and Mobile.dc.html`): every smaller viewport.

Both layouts share the components, the content in `src/data.ts`, and the URL scheme below.

```sh
npm install
npm run dev        # site at http://localhost:5173/
npm run build      # type-check + production build
```

## Routes (hash based)

| Route | Screen |
| --- | --- |
| `#/` | Home menu |
| `#/profile` | Profile |
| `#/experience`, `#/experience/leadership` | Service record: Professional, Leadership |
| `#/projects`, `#/projects/<id>` | Projects: Featured / Personal / Academic / Hackathons tabs, image slideshow, links |
| `#/skills` | Loadout config |
| `#/awards` | Awards, one row per prize; rows expand on hover/tap, photos open full screen |
| `#/contact` | Comms |
| `#/resume`, `#/resume/<variant id>` | Résumé viewer with download. Variants live in `RESUMES` in `src/data.ts`; the first is the main one |
| `#/components` | Component sheet: live mobile frames + every component state |

## Colours and theming

Every colour derives from a few **knobs** at the top of `src/styles/tokens.css`:

| Knob | Controls | Example |
| --- | --- | --- |
| `--hue` | All background gradients, glows, panels, award rows, result cards | `25` red, `250` blue, `195` teal |
| `--alt-shift` | Skills/Contact background hue, relative to `--hue` | `-15` nearby, `180` contrasting |
| `--vivid` / `--light` / `--glow` | Background saturation, brightness, glow strength | `0` = greyscale backgrounds |
| `--tint` | How much panels and cards pick up `--hue` | `0` = neutral grey |
| `--hue-accent`, `--hue-info`, `--hue-alert`, `--hue-new`, `--hue-neutral` | Gold/amber, blue labels, alert red, NEW green, off-whites | |

To experiment, open `#/components`. The **Theme lab** at the top has presets and sliders that recolour the page live.
**Copy CSS** gives you the knob block to paste over the one in `tokens.css`. "Preview on the live site" applies the
lab values to the real site in your browser only, with a badge in the corner to reset.

## Layout

- `src/styles/tokens.css`: design tokens (colors, type, scenes)
- `src/components/`: MenuItem, SubOptionRow, ListBar, StatTile, InfoBox, AbilityCard,
  CutCornerButton, MediaButton, SettingsRow, PromptBar, PlayerBlock, ResultCard,
  TransmissionWindow, ChapterCard, LoadingBar. States can be forced with `state` / `data-state`.
- `src/mobile/`: mobile shell, routing and screens
- `src/desktop/`: desktop canvas, keyboard handling and screens (`src/styles/desktop.css`)
- `src/data.ts`: all portfolio content

## Still placeholder

- Project media and the contact portrait are hatched placeholders (`MediaPlaceholder src`, `TransmissionWindow portrait`).
- `public/resume.pdf` isn't in the repo yet.
- "READ ARTICLE" (Ember) and "LETTER OF RECOMMENDATION" (Dayforce) show as disabled until they have links.
- Contact form opens the visitor's mail client (`mailto:`); there's no backend.
