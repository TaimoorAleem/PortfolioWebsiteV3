# Portfolio Website V3

Mobile portfolio site and component library, implemented from the Claude Design file
`Components and Mobile.dc.html`.

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
- `src/mobile/`: app shell, routing and screens
- `src/data.ts`: all portfolio content

## Still placeholder

- Project media and the contact portrait are hatched placeholders (`MediaPlaceholder src`, `TransmissionWindow portrait`).
- `public/resume.pdf` isn't in the repo yet.
- "READ ARTICLE" (Ember) and "LETTER OF RECOMMENDATION" (Dayforce) show as disabled until they have links.
- Contact form opens the visitor's mail client (`mailto:`); there's no backend.
