// Theme knobs: the handful of CSS custom properties in src/styles/tokens.css
// that every other colour is derived from. Used by the Theme lab (#/components)
// to preview schemes live without editing the stylesheet.

export interface Knob {
  name: string;          // CSS custom property, without the leading --
  label: string;
  min: number;
  max: number;
  step: number;
  group: 'Background' | 'Accents';
  hint?: string;
}

export const KNOBS: Knob[] = [
  { name: 'hue', label: 'Background hue', min: 0, max: 360, step: 1, group: 'Background', hint: '25 red · 250 blue' },
  { name: 'alt-shift', label: 'Skills/Contact hue shift', min: -180, max: 180, step: 1, group: 'Background' },
  { name: 'vivid', label: 'Saturation', min: 0, max: 2, step: 0.05, group: 'Background' },
  { name: 'light', label: 'Brightness', min: 0.6, max: 1.6, step: 0.02, group: 'Background' },
  { name: 'glow', label: 'Glow strength', min: 0, max: 2, step: 0.05, group: 'Background' },
  { name: 'tint', label: 'Panel tint', min: 0, max: 0.06, step: 0.002, group: 'Background' },
  { name: 'hue-accent', label: 'Gold / amber hue', min: 0, max: 360, step: 1, group: 'Accents' },
  { name: 'hue-info', label: 'Blue label hue', min: 0, max: 360, step: 1, group: 'Accents' },
  { name: 'hue-alert', label: 'Alert hue', min: 0, max: 360, step: 1, group: 'Accents' },
  { name: 'hue-new', label: 'NEW badge hue', min: 0, max: 360, step: 1, group: 'Accents' },
  { name: 'hue-neutral', label: 'Off-white hue', min: 0, max: 360, step: 1, group: 'Accents' },
];

export type ThemeValues = Record<string, number>;

export const PRESETS: { name: string; values: ThemeValues }[] = [
  { name: 'Red', values: { hue: 25, 'alt-shift': -15, vivid: 1, light: 1, glow: 1, tint: 0.012 } },
  { name: 'Blue', values: { hue: 250, 'alt-shift': -15, vivid: 1, light: 1, glow: 1, tint: 0.012 } },
  { name: 'Teal', values: { hue: 195, 'alt-shift': -20, vivid: 0.9, light: 1, glow: 1, tint: 0.012 } },
  { name: 'Violet', values: { hue: 295, 'alt-shift': -25, vivid: 1, light: 1, glow: 1, tint: 0.012 } },
  { name: 'Forest', values: { hue: 150, 'alt-shift': 20, vivid: 0.8, light: 1, glow: 1, tint: 0.012 } },
  { name: 'Original warm', values: { hue: 75, 'alt-shift': 170, vivid: 0.3, light: 1, glow: 1, tint: 0.012 } },
  { name: 'Mono', values: { hue: 25, 'alt-shift': 0, vivid: 0, light: 1, glow: 0.6, tint: 0 } },
];

const STORAGE_KEY = 'ta-theme-preview';
const root = () => document.documentElement;

/** Values as written in tokens.css (ignores any live overrides). */
export function readDefaults(): ThemeValues {
  const saved: Record<string, string> = {};
  for (const k of KNOBS) {
    saved[k.name] = root().style.getPropertyValue(`--${k.name}`);
    root().style.removeProperty(`--${k.name}`);
  }
  const cs = getComputedStyle(root());
  const out: ThemeValues = {};
  for (const k of KNOBS) out[k.name] = parseFloat(cs.getPropertyValue(`--${k.name}`)) || 0;
  for (const k of KNOBS) if (saved[k.name]) root().style.setProperty(`--${k.name}`, saved[k.name]);
  return out;
}

export function applyTheme(values: ThemeValues) {
  for (const [k, v] of Object.entries(values)) root().style.setProperty(`--${k}`, String(v));
}

export function clearTheme() {
  for (const k of KNOBS) root().style.removeProperty(`--${k.name}`);
}

export function loadPreview(): ThemeValues | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ThemeValues) : null;
  } catch {
    return null;
  }
}

export function savePreview(values: ThemeValues | null) {
  try {
    if (values) localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    else localStorage.removeItem(STORAGE_KEY);
  } catch { /* storage blocked: preview just won't persist */ }
}

/** The knob block to paste into tokens.css. */
export function toCss(values: ThemeValues): string {
  // Same order as the knob block in tokens.css, including the derived --hue-alt line,
  // so the whole block can be pasted over the existing one.
  return KNOBS.flatMap((k) => {
    const line = `  --${k.name}: ${values[k.name]};`;
    return k.name === 'alt-shift' ? [line, '  --hue-alt: calc(var(--hue) + var(--alt-shift));'] : [line];
  }).join('\n');
}
