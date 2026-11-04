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
| `#/projects`, `#/projects/<id>` | Project list, project briefing |
| `#/archive` | All projects by category (desktop grid; the mobile list with category filter) |
| `#/experience` | Service record |
| `#/about`, `#/about/awards`, `#/about/networks` | Profile tabs |
| `#/skills` | Loadout config |
| `#/contact` | Comms |
| `#/components` | Component sheet: live mobile frames + every component state |

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
