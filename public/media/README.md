# Media

Files here are served from `/media/...`. After adding one, set its path in `src/data.ts`.

| Put the file at | Set in `src/data.ts` | Shown | Suggested size |
| --- | --- | --- | --- |
| `projects/<id>.jpg` | `image: '/media/projects/<id>.jpg'` on the project | Mobile project + briefing, desktop briefing hero, archive tile | 1600 × 1000 (16:10) |
| `projects/<id>-cutout.png` (optional) | `cutout: '/media/projects/<id>-cutout.png'` | Desktop Projects screen tall frame | 600 × 1080, transparent PNG |
| `portrait.jpg` | `MEDIA.portrait` | Contact transmission window (gets a red duotone) | 800 × 400 |
| `latest.jpg` | `MEDIA.latest` | Desktop home "LATEST" card | 880 × 300 |
| `bearhacks.jpg` | `MEDIA.bearhacks` | Desktop home tile | 440 × 160 |
| `cricket.jpg` | `MEDIA.cricket` | Desktop home tile | 440 × 160 |

Project ids: `ember`, `proprio`, `mercato`, `rocky`, `prismarine`, `voxel`, `cricket`.
