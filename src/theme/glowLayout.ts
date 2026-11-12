import type { CSSProperties } from 'react';

// Where the background glows sit on each page. Positions are % of the screen.
// The scene gradients read them as --s1x/--s1y … --s7x/--s7y.
// They're registered with @property in glows.css, so changing page makes the
// glows drift to their new spots instead of jumping.
//
// Slot meaning per scene:
//   warm scene (home, projects, archive, awards, networks):
//     s1 big soft light · s2 second light · s3 low light · s4–s7 small bright bokeh
//   wine scene (skills, contact):
//     s1 big light · s2 second light · s3–s5 amber sparks · s6 pale spark
//   dark scene (briefing, experience, profile): s1 corner light · s2 bokeh
//   mobile uses s1–s3 only.

type P = [number, number];
interface Layout { s: P[] }

const DESKTOP: Record<string, Layout> = {
  home:       { s: [[70, 28], [88, 62], [56, 76], [80, 14], [64, 46], [93, 36], [74, 84]] },
  projects:   { s: [[84, 44], [60, 80], [92, 16], [66, 10], [88, 62], [54, 32], [78, 92]] },
  awards:     { s: [[88, 74], [64, 18], [96, 34], [58, 90], [80, 42], [70, 6], [91, 95]] },
  skills:     { s: [[72, 32], [90, 70], [66, 22], [84, 48], [58, 64], [94, 18], [0, 0]] },
  contact:    { s: [[86, 74], [62, 22], [92, 40], [72, 88], [88, 12], [56, 56], [0, 0]] },
  experience: { s: [[94, 92], [70, 76]] },
  leadership: { s: [[60, 96], [92, 30]] },
  profile:    { s: [[58, 2], [90, 40]] },
  resume:     { s: [[10, 96], [30, 70]] },
  blogs:      { s: [[96, 8], [16, 88]] },
};

const MOBILE: Record<string, Layout> = {
  home:       { s: [[78, 22], [86, 70], [70, 12]] },
  profile:    { s: [[85, 96], [20, 30], [70, 50]] },
  resume:     { s: [[10, 10], [85, 80], [40, 60]] },
  projects:   { s: [[82, 62], [20, 90], [90, 8]] },
  experience: { s: [[12, 100], [90, 60], [30, 10]] },
  about:      { s: [[88, 76], [20, 20], [64, 40]] },
  skills:     { s: [[18, 82], [80, 30], [60, 70]] },
  contact:    { s: [[80, 18], [20, 60], [90, 90]] },
  blogs:      { s: [[92, 88], [10, 40], [70, 8]] },
};

// Each page nudges the background hue a little (degrees, applied as hue-rotate on the scene),
// so pages feel distinct while keeping the theme colour. Glides between pages like the glows.
const PAGE_HUE: Record<string, number> = {
  home: 0, profile: -10, experience: 10, leadership: 18, projects: -16, skills: 8,
  awards: 14, about: 14, blogs: -22, contact: -6, resume: 5,
};

function toVars({ s }: Layout, screen: string): CSSProperties {
  const out: Record<string, string> = { '--page-hue': `${PAGE_HUE[screen] ?? 0}deg` };
  s.forEach(([x, y], i) => {
    out[`--s${i + 1}x`] = `${x}%`;
    out[`--s${i + 1}y`] = `${y}%`;
  });
  return out as CSSProperties;
}

export const desktopGlows = (screen: string) => toVars(DESKTOP[screen] ?? DESKTOP.home, screen);
export const mobileGlows = (screen: string) => toVars(MOBILE[screen] ?? MOBILE.home, screen);
