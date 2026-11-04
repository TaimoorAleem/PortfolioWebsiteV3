import type { CSSProperties } from 'react';

// Where the background glows sit on each page. Positions are % of the screen.
// The scene gradients read them as --s1x/--s1y … --s7x/--s7y and the dark vertical
// bands as --b1/--b2 (left edge of each band; keep b2 at least 8 more than b1).
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
interface Layout { s: P[]; b?: [number, number] }

const DESKTOP: Record<string, Layout> = {
  home:       { s: [[70, 28], [88, 62], [56, 76], [80, 14], [64, 46], [93, 36], [74, 84]], b: [46, 76] },
  projects:   { s: [[84, 44], [60, 80], [92, 16], [66, 10], [88, 62], [54, 32], [78, 92]], b: [52, 84] },
  archive:    { s: [[62, 12], [92, 46], [40, 90], [86, 6], [72, 66], [97, 82], [50, 54]], b: [36, 68] },
  awards:     { s: [[88, 74], [64, 18], [96, 34], [58, 90], [80, 42], [70, 6], [91, 95]], b: [60, 88] },
  networks:   { s: [[52, 14], [93, 84], [76, 52], [95, 10], [60, 72], [84, 30], [68, 94]], b: [42, 72] },
  skills:     { s: [[72, 32], [90, 70], [66, 22], [84, 48], [58, 64], [94, 18], [0, 0]], b: [54, 82] },
  contact:    { s: [[86, 74], [62, 22], [92, 40], [72, 88], [88, 12], [56, 56], [0, 0]], b: [46, 76] },
  briefing:   { s: [[86, 8], [78, 20]] },
  experience: { s: [[94, 92], [70, 76]] },
  about:      { s: [[58, 2], [90, 40]] },
};

const MOBILE: Record<string, Layout> = {
  home:       { s: [[78, 22], [86, 70], [70, 12]] },
  projects:   { s: [[82, 62], [20, 90], [90, 8]] },
  briefing:   { s: [[90, 0], [10, 80], [80, 40]] },
  experience: { s: [[12, 100], [90, 60], [30, 10]] },
  about:      { s: [[85, 96], [20, 30], [70, 50]] },
  skills:     { s: [[18, 82], [80, 30], [60, 70]] },
  contact:    { s: [[80, 18], [20, 60], [90, 90]] },
};

function toVars({ s, b }: Layout): CSSProperties {
  const out: Record<string, string> = {};
  s.forEach(([x, y], i) => {
    out[`--s${i + 1}x`] = `${x}%`;
    out[`--s${i + 1}y`] = `${y}%`;
  });
  if (b) { out['--b1'] = `${b[0]}%`; out['--b2'] = `${b[1]}%`; }
  return out as CSSProperties;
}

export const desktopGlows = (screen: string) => toVars(DESKTOP[screen] ?? DESKTOP.home);
export const mobileGlows = (screen: string) => toVars(MOBILE[screen] ?? MOBILE.home);
