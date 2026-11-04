import { useEffect, useMemo, useRef, useState } from 'react';
import { KNOBS, PRESETS, applyTheme, clearTheme, loadPreview, readDefaults, savePreview, toCss, type ThemeValues } from './knobs';

const SWATCHES = [
  '--bg-950', '--bg-900', '--bg-800', '--bg-700', '--bg-600', '--bg-500', '--bg-400',
  '--alt-900', '--alt-700', '--alt-500',
  '--c-amber', '--c-gold', '--c-focus', '--c-blue', '--c-link', '--c-new', '--c-alert', '--c-selected',
];

/** Live editor for the theme knobs in tokens.css. Shown at the top of #/components. */
export function ThemeLab() {
  const defaults = useMemo(readDefaults, []);
  const [values, setValues] = useState<ThemeValues>(() => ({ ...defaults, ...loadPreview() }));
  const [onSite, setOnSite] = useState(() => loadPreview() !== null);
  const [copied, setCopied] = useState(false);

  const changed = KNOBS.some((k) => values[k.name] !== defaults[k.name]);

  useEffect(() => {
    applyTheme(values);
    if (onSite) savePreview(values);
  }, [values, onSite]);

  // Leaving the lab: keep the overrides only if "preview on the live site" is on.
  const onSiteRef = useRef(onSite);
  onSiteRef.current = onSite;
  useEffect(() => () => { if (!onSiteRef.current) clearTheme(); }, []);

  const set = (name: string, v: number) => setValues((cur) => ({ ...cur, [name]: v }));
  const reset = () => { setValues(defaults); setOnSite(false); savePreview(null); clearTheme(); };
  const toggleSite = (on: boolean) => { setOnSite(on); savePreview(on ? values : null); };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(toCss(values));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard blocked: the CSS is visible in the box below */ }
  };

  return (
    <section className="lab">
      <div className="sheet-head">
        <span className="sheet-head__title">THEME LAB</span>
        <span className="sheet-head__sub">Drag a knob and everything on this page follows. Copy the CSS into the top of src/styles/tokens.css to keep it.</span>
      </div>

      <div className="lab__presets">
        {PRESETS.map((p) => (
          <button key={p.name} type="button" className="btn-reset lab__preset" onClick={() => setValues((cur) => ({ ...cur, ...p.values }))}>
            {p.name}
          </button>
        ))}
      </div>

      <div className="lab__grid">
        {(['Background', 'Accents'] as const).map((g) => (
          <div key={g} className="lab__group">
            <span className="section-header">{g.toUpperCase()}</span>
            {KNOBS.filter((k) => k.group === g).map((k) => {
              const isHue = k.name === 'hue' || k.name.startsWith('hue-');
              return (
                <label key={k.name} className="lab__row">
                  <span className="lab__label">{k.label}{k.hint && <em> · {k.hint}</em>}</span>
                  <input
                    type="range"
                    className={isHue ? 'lab__range lab__range--hue' : 'lab__range'}
                    min={k.min}
                    max={k.max}
                    step={k.step}
                    value={values[k.name]}
                    onChange={(e) => set(k.name, Number(e.target.value))}
                  />
                  <input
                    type="number"
                    className="lab__num"
                    min={k.min}
                    max={k.max}
                    step={k.step}
                    value={values[k.name]}
                    onChange={(e) => set(k.name, Number(e.target.value))}
                  />
                </label>
              );
            })}
          </div>
        ))}

        <div className="lab__group">
          <span className="section-header">RESULT</span>
          <div className="lab__swatches">
            {SWATCHES.map((s) => <span key={s} title={s} style={{ background: `var(${s})` }} />)}
          </div>
          <pre className="lab__css">{toCss(values)}</pre>
          <div className="lab__actions">
            <button type="button" className="btn-reset lab__btn" onClick={copy}>{copied ? 'COPIED' : 'COPY CSS'}</button>
            <button type="button" className="btn-reset lab__btn" onClick={reset} disabled={!changed && !onSite}>RESET TO TOKENS.CSS</button>
            <label className="lab__check">
              <input type="checkbox" checked={onSite} onChange={(e) => toggleSite(e.target.checked)} />
              Preview on the live site (this browser only)
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

/** On the live site: apply a saved lab preview and say so, with a way out. */
export function ThemePreviewBadge() {
  const [preview, setPreview] = useState(loadPreview);
  useEffect(() => { if (preview) applyTheme(preview); }, [preview]);
  if (!preview) return null;
  return (
    <div className="lab-badge">
      Theme lab preview
      <a href="#/components">edit</a>
      <button type="button" className="btn-reset" onClick={() => { savePreview(null); clearTheme(); setPreview(null); }}>reset</button>
    </div>
  );
}
