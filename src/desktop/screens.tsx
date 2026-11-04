import { useEffect, useRef, type ReactNode } from 'react';
import {
  AbilityCard, CutCornerButton, InfoBox, ListBar, ListGroupHeader, MenuItem, ResultCard, SettingsRow, StatTile,
  SubOptionRow, TransmissionWindow,
} from '../components';
import {
  ABOUT, AWARDS, CATS, EXPERIENCE, LINKS, MEDIA, NETWORKS, RESULT_CARDS, SKILLS, catIds, projectById, skillUse, techCode,
} from '../data';
import { D_MENU, curList, skillRows, titleCase, type DState } from './state';

export interface DCtx {
  s: DState;
  set: (patch: Partial<DState>) => void;
  go: (patch: Partial<DState>) => void;
  activate: (mi: number, si: number) => void;
  openLink: (i: number) => void;
  send: () => void;
  form: Record<FormKey, string>;
  setField: (k: FormKey, v: string) => void;
}

export const FIELDS = [
  { key: 'name', label: 'Name', ph: 'Your name', type: 'text' },
  { key: 'email', label: 'Email', ph: 'you@company.com', type: 'email' },
  { key: 'message', label: 'Message', ph: 'A few lines is plenty', type: 'text' },
] as const;
export type FormKey = (typeof FIELDS)[number]['key'];

interface SlideItem {
  key: string;
  label: string;
  isNew?: boolean;
  featured?: boolean;
  trailing?: ReactNode;
}

/** Vertical ListBar column with the selection highlight sliding between rows. */
function SlideList({ items, sel, width, bold, onHover, onClick }: {
  items: SlideItem[]; sel: number; width: number; bold?: boolean;
  onHover: (i: number) => void; onClick?: (i: number) => void;
}) {
  return (
    <div className="d-list" style={{ width }}>
      <div className="d-slider" style={{ top: sel * 47, width }} />
      <div className="d-list__items">
        {items.map((it, i) => (
          <ListBar
            key={it.key}
            className={bold ? 'd-bar d-bar--bold' : 'd-bar'}
            style={{ width }}
            label={it.label}
            isNew={it.isNew}
            featured={it.featured}
            trailing={it.trailing}
            selected={i === sel}
            onMouseEnter={() => onHover(i)}
            onClick={() => (onClick ?? onHover)(i)}
          />
        ))}
      </div>
    </div>
  );
}

const Rule = ({ left, height = 560 }: { left: number; height?: number }) => (
  <div className="d-vrule" style={{ left, height }} />
);

/* ------------------------------------------------------------------ home */

export function DHome({ s, set, activate, go }: DCtx) {
  return (
    <div className="d-screen">
      <div className="d-news">
        <div className="d-news__tag"><span>NEW:</span><span className="d-news__chev" /></div>
        <div className="d-news__lines">
          <button type="button" className="btn-reset" onClick={() => go({ screen: 'briefing', list: null, listName: 'Featured', projIdx: 1, from: 'projects' })}>
            Proprio is live: an ML pipeline with <span className="d-amber">rebuilt evaluation</span>
          </button>
          <button type="button" className="btn-reset" onClick={() => go({ screen: 'briefing', list: null, listName: 'Featured', projIdx: 0, from: 'projects' })}>
            Ember presented to <span className="d-amber">Google engineers in NYC</span>
          </button>
          <button type="button" className="btn-reset" onClick={() => go({ screen: 'contact' })}>
            Open to <span className="d-amber">new grad roles</span> in AI and software
          </button>
        </div>
      </div>

      <div className="d-hero">
        <h1 className="d-hero__name">TAIMOOR ALEEM</h1>
        <div className="d-hero__rule" />
        <div className="d-hero__roles"><span>AI ENGINEER</span><span>SOFTWARE DEVELOPER</span></div>
      </div>
      <div className="d-build">build 2026.11</div>

      <nav className="d-menu" aria-label="Main">
        {D_MENU.map((m, i) => {
          const f = i === s.menuIdx;
          const subs = 'subs' in m ? m.subs : null;
          return (
            <div key={m.id} className="d-menu__item">
              <div className="d-menu__row">
                <MenuItem
                  label={m.label}
                  focused={f}
                  special={'special' in m}
                  isNew={'isNew' in m}
                  onMouseEnter={() => { if (s.menuIdx !== i) set({ menuIdx: i, subIdx: 0 }); }}
                  onClick={() => activate(i, f ? s.subIdx : 0)}
                />
              </div>
              {/* Every item gets the (collapsed) options row so spacing stays even, as in the design. */}
              <div className="d-menu__subs" style={{ height: f && subs ? 34 : 0 }} aria-hidden={!(f && subs)}>
                {subs && (
                  <SubOptionRow
                    label={`${m.label} options`}
                    options={[...subs]}
                    selected={f ? s.subIdx : -1}
                    onSelect={(j) => activate(i, j)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="d-latest">
        <button type="button" className="btn-reset d-latest__hero" onClick={() => go({ screen: 'briefing', list: null, listName: 'Featured', projIdx: 0, from: 'projects' })}>
          {MEDIA.latest && <img className="d-img" src={MEDIA.latest} alt="Ember team" />}
          <span className="d-latest__word">LATEST</span>
          <span className="d-latest__scan" />
          {!MEDIA.latest && <span className="d-latest__cap">ember team photo</span>}
        </button>
        <div className="d-latest__body">
          <span className="d-latest__title">IgnisXR: Ember, an XR helmet system for firefighters</span>
          <span className="d-latest__sub">Top 3 in North America at the Google Solution Challenge.</span>
        </div>
        <div className="d-latest__tiles">
          <button type="button" className="btn-reset d-latest__tile" onClick={() => go({ screen: 'networks', netIdx: 0 })}>
            {MEDIA.bearhacks && <img className="d-img" src={MEDIA.bearhacks} alt="" />}
            <span>BearHacks 2026: Mississauga's largest hackathon</span>
          </button>
          <button type="button" className="btn-reset d-latest__tile" onClick={() => go({ screen: 'briefing', list: null, listName: 'Featured', projIdx: 6, from: 'projects' })}>
            {MEDIA.cricket && <img className="d-img" src={MEDIA.cricket} alt="" />}
            <span>AI Cricket Coach: first place capstone</span>
          </button>
        </div>
      </div>

      <div className="d-sig">
        <span>taimooraleem.com</span>
        <span>© 2026</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- projects */

function useProj(s: DState) {
  const ids = curList(s);
  const pi = Math.min(s.projIdx, ids.length - 1);
  return { ids, pi, p: projectById(ids[pi])! };
}

export function DProjects({ s, set, go }: DCtx) {
  const { ids, pi, p } = useProj(s);
  return (
    <div className="d-screen">
      <div className="d-loaded">
        <span className="d-spinner" />
        <div><b>{ids.length} PROJECTS LOADED</b><span>Sorted by most recent</span></div>
      </div>
      <div style={{ position: 'absolute', left: 80, top: 200 }}>
        <SlideList
          width={200}
          sel={pi}
          items={ids.map((id) => { const q = projectById(id)!; return { key: id, label: q.name, isNew: q.isNew, featured: q.featured }; })}
          onHover={(i) => set({ projIdx: i })}
          onClick={(i) => (i === pi ? go({ screen: 'briefing', from: 'projects' }) : set({ projIdx: i }))}
        />
      </div>
      <Rule left={300} />
      <div className="d-proj" key={p.id}>
        <div className="d-stack2">
          <span className="d-gold">{p.gold}</span>
          <span className="d-blue">{p.blue}</span>
        </div>
        {p.awards && (
          <div style={{ display: 'flex', gap: 16 }}>
            {p.awards.map((a) => (
              <div key={a} className="d-award-badge">
                <span>Award: {a}</span>
                <div className="d-award-badge__icon"><span /></div>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {p.stats.map((st) => {
            const slots: { code?: string; name?: string; empty?: boolean }[] = st.tech.map((t) => ({ code: techCode(t), name: t }));
            while (slots.length < 3) slots.push({ empty: true });
            return <StatTile key={st.label} label={st.label} value={st.value} caption={st.caption} slots={slots} />;
          })}
        </div>
        <button type="button" className="btn-reset d-press" onClick={() => go({ screen: 'briefing', from: 'projects' })}>
          Press <span className="prompt__key">↵</span> to open full briefing
        </button>
        {p.perks && (
          <div style={{ display: 'flex', gap: 12 }}>
            {p.perks.map((k) => (
              <div key={k} className="d-perk"><div className="d-perk__icon"><span /></div><span>{k}</span></div>
            ))}
          </div>
        )}
      </div>
      <div className="d-proj-media">
        <div className="d-proj-media__frame">
          {p.cutout || p.image
            ? <img className={p.cutout ? 'd-img d-img--contain' : 'd-img'} src={p.cutout ?? p.image} alt={p.media} />
            : <span>{p.media}</span>}
        </div>
        <div className="d-proj-media__shadow" />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- archive */

export function DArchive({ s, set, go }: DCtx) {
  const tiles = catIds(s.catIdx);
  const open = (j: number) => go({ screen: 'briefing', list: tiles, listName: titleCase(CATS[s.catIdx]), projIdx: j, from: 'archive' });
  return (
    <div className="d-screen">
      <div style={{ position: 'absolute', left: 80, top: 200 }}>
        <SlideList
          width={240}
          bold
          sel={s.catIdx}
          items={CATS.map((c, i) => ({ key: c, label: c, trailing: catIds(i).length }))}
          onHover={(i) => set({ catIdx: i })}
        />
      </div>
      <Rule left={340} />
      <div className="d-tiles">
        {tiles.map((id, j) => {
          const p = projectById(id)!;
          return (
            <button key={id} type="button" className="btn-reset d-tile" onClick={() => open(j)}>
              <span className="d-tile__media">
                {p.image ? <img className="d-img" src={p.image} alt="" /> : <span>{p.short} screenshot</span>}
                {p.isNew && <span className="d-tile__new" />}
              </span>
              <span className="d-tile__body">
                <span className="d-tile__name">{p.short}</span>
                <span className="d-tile__blue">{p.blue}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- briefing */

export function DBriefing({ s, set }: DCtx) {
  const { ids, pi, p } = useProj(s);
  return (
    <div className="d-screen">
      <div style={{ position: 'absolute', left: 80, top: 200, width: 200 }}>
        <ListGroupHeader>{s.listName}</ListGroupHeader>
        <div style={{ marginTop: 10 }}>
          <SlideList
            width={200}
            sel={pi}
            items={ids.map((id) => { const q = projectById(id)!; return { key: id, label: q.short, isNew: q.isNew, featured: q.featured }; })}
            onHover={(i) => set({ projIdx: i })}
          />
        </div>
      </div>
      <Rule left={300} />
      <div className="d-brief" key={p.id}>
        <div className="d-brief__top">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="d-h30">{p.short}</span>
            <div className="d-brief__hero">
              {p.image ? <img className="d-img" src={p.image} alt={p.media} /> : <span>{p.short} hero media, 16:9</span>}
            </div>
          </div>
          <div className="d-brief__info">
            <span className="d-gold d-gold--24">{p.gold}</span>
            <span className="d-blue" style={{ marginTop: 16 }}>{p.blue}</span>
            <p className="d-para" style={{ marginTop: 16 }}>
              {p.desc.map((d, k) => (d.hl ? <span key={k} className="d-hl">{d.t}</span> : d.t))}
            </p>
            <div className="d-stack-tags">
              {p.stack.map((t) => <span key={t}>{t}</span>)}
            </div>
            <div className="d-brief__btns">
              {p.btns.map((b) => <CutCornerButton key={b.label} href={b.href} disabled={!b.href}>{b.label}</CutCornerButton>)}
            </div>
          </div>
        </div>
        <div className="d-cards">
          {p.cards.map(([t, d], k) => <AbilityCard key={t} icon index={k + 1} title={t} desc={d} core={k === 3} />)}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ experience */

export function DExperience({ s, set }: DCtx) {
  const e = EXPERIENCE[s.expIdx];
  return (
    <div className="d-screen">
      <div style={{ position: 'absolute', left: 80, top: 200 }}>
        <SlideList width={220} sel={s.expIdx} items={EXPERIENCE.map((x) => ({ key: x.name, label: x.name }))} onHover={(i) => set({ expIdx: i })} />
      </div>
      <Rule left={324} />
      <div className="d-chapter" key={`c${s.expIdx}`}>
        <span className="d-chapter__num">{e.num}</span>
        <div className="d-chapter__text">
          <span className="d-chapter__company">{e.company}</span>
          <span className="d-chapter__meta">{e.meta}</span>
        </div>
      </div>
      <div className="d-exp" key={`b${s.expIdx}`}>
        <span className="section-header">{e.section}</span>
        <div className="d-cards d-cards--panel">
          {e.cards.map(([t, d], k) => <AbilityCard key={t} icon index={k + 1} title={t} desc={d} core={k === 3} />)}
        </div>
        {e.extra && <span className="d-para">{e.extra}</span>}
        {e.btn && <div><CutCornerButton href={e.btn.href} disabled={!e.btn.href}>{e.btn.label}</CutCornerButton></div>}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- awards */

export function DAwards({ s, set }: DCtx) {
  return (
    <div className="d-screen">
      <div className="d-results">
        {RESULT_CARDS.map((r) => <ResultCard key={r.label} label={r.label} place={r.place} />)}
      </div>
      <div className="d-awards">
        <div className="d-awards__tab-row"><div className="d-awards__tab">ON RECORD · {AWARDS.length}</div></div>
        <div className="d-awards__grid d-awards__head"><span>Event</span><span>Result</span><span>Built with</span><span style={{ textAlign: 'right' }}>Year</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {AWARDS.map((a, i) => (
            <div
              key={a.event}
              className={`d-awards__grid d-award-row${i === s.awardIdx ? ' is-selected' : ''}${i === 0 ? ' is-first' : ''}`}
              onMouseEnter={() => set({ awardIdx: i })}
            >
              <span style={{ fontWeight: 600 }}>{a.event}</span>
              <span>{a.result}</span>
              <span style={{ opacity: 0.85 }}>{a.team}</span>
              <span className="d-award-row__year">{a.year}</span>
            </div>
          ))}
          <div className="d-award-row d-award-row--empty" />
          <div className="d-award-row d-award-row--empty" />
        </div>
        <span className="d-note">Every one of these was a team effort.</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- networks */

export function DNetworks({ s, set }: DCtx) {
  const n = NETWORKS[s.netIdx];
  return (
    <div className="d-screen">
      <div className="d-nets">
        <div className="d-nets__head">
          <span className="d-nets__title">NETWORK <span className="d-dim">|</span> <span style={{ fontWeight: 400, letterSpacing: 0 }}>Communities I've helped run</span></span>
          <span className="d-amber" style={{ fontWeight: 600 }}>300+ hackers hosted at BearHacks</span>
        </div>
        <div className="d-nets__cols">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {NETWORKS.map((x, i) => (
              <button
                key={x.name}
                type="button"
                className={`btn-reset d-net${i === s.netIdx ? ' is-selected' : ''}`}
                onMouseEnter={() => set({ netIdx: i })}
                onClick={() => set({ netIdx: i })}
              >
                <span style={{ fontSize: 11 }}>◀</span>
                <span className="d-net__text"><b>{x.name}</b><span>{x.role}</span></span>
              </button>
            ))}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.85)' }} />
          <div className="d-net-detail" key={s.netIdx}>
            <span className="d-h30">{n.name}</span>
            <span className="d-blue">{n.role}{n.dates ? ` · ${n.dates}` : ''}</span>
            {n.text ? <p className="d-para" style={{ marginTop: 6 }}>{n.text}</p> : <span className="d-pending">DETAILS COMING SOON</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- skills */

export function DSkills({ s, set }: DCtx) {
  const rows = skillRows();
  const sr = rows[s.skillIdx];
  const cur = sr.vals[s.skillVal % sr.vals.length];
  // Keep the selected row in view inside the 570px window.
  let flat = 0, y = 0, selY = 0;
  const groups = SKILLS.map(([g, list]) => {
    y += 30;
    const out = { g, rows: list.map(([name, vals]) => { const idx = flat++; if (idx === s.skillIdx) selY = y; y += 32; return { idx, name, vals }; }) };
    y += 14;
    return out;
  });
  const scroll = -Math.max(0, Math.min(y - 570, selY - 300));
  const cycle = (d: number) => set({ skillVal: (s.skillVal + d + sr.vals.length) % sr.vals.length });

  return (
    <div className="d-screen">
      <div className="d-skills">
        <div className="d-skills__inner" style={{ transform: `translateY(${scroll}px)` }}>
          {groups.map(({ g, rows: rs }) => (
            <div key={g} style={{ display: 'flex', flexDirection: 'column', marginBottom: 14 }}>
              <span className="section-header" style={{ paddingBottom: 5, marginBottom: 4 }}>{g}</span>
              {rs.map((r) => {
                const sel = r.idx === s.skillIdx;
                return (
                  <SettingsRow
                    key={r.name}
                    label={r.name}
                    selected={sel}
                    value={sel ? r.vals[s.skillVal % r.vals.length] : r.vals.join(', ')}
                    onPrev={() => cycle(-1)}
                    onNext={() => cycle(1)}
                    onHover={() => { if (!sel) set({ skillIdx: r.idx, skillVal: 0 }); }}
                    onClick={() => { if (!sel) set({ skillIdx: r.idx, skillVal: 0 }); }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="d-skill-panel" key={s.skillIdx}>
        <div className="d-stack2">
          <span className="d-h30">{sr.name}</span>
          <span className="d-blue">{titleCase(sr.group)}</span>
        </div>
        {sr.vals.map((v) => (
          <p key={v} className="d-skill-para" style={{ opacity: v === cur ? 1 : 0.5 }}>
            <span className="d-hl" style={{ fontWeight: 600 }}>{v}:</span> {skillUse(sr.name, v)}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- about */

export function DAbout({ s, set }: DCtx) {
  const a = ABOUT[s.aboutIdx];
  return (
    <div className="d-screen">
      <div className="d-about-list">
        {ABOUT.map((x, i) => (
          <MenuItem key={x.label} label={x.label} focused={i === s.aboutIdx} onMouseEnter={() => set({ aboutIdx: i })} onClick={() => set({ aboutIdx: i })} />
        ))}
      </div>
      <div className="d-logbook" key={s.aboutIdx}>
        <span className="d-logbook__title">LOGBOOK <span className="d-dim">/ {a.label}</span></span>
        {a.paras.map((p) => <p key={p} className="d-logbook__p">{p}</p>)}
        {a.pending && <span className="d-pending">ENTRY COMING SOON</span>}
        <div className="d-logbook__foot"><span className="d-logbook__gem" /><span>21 events organized</span></div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- contact */

export function DContact({ s, set, send, form, setField }: DCtx) {
  const n = LINKS.length;
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  // Keyboard selection onto a field focuses its input.
  useEffect(() => {
    const j = s.contactIdx - n;
    if (j >= 0 && j < FIELDS.length) refs.current[j]?.focus();
  }, [s.contactIdx, n]);

  return (
    <div className="d-screen">
      <div className="d-contact">
        <span className="section-header" style={{ paddingBottom: 5, marginBottom: 4 }}>CHANNELS</span>
        {LINKS.map((l, i) => (
          <SettingsRow
            key={l.label}
            label={l.label}
            gold={l.gold}
            value={l.value}
            arrows={i === 0}
            selected={s.contactIdx === i}
            href={l.href}
            onHover={() => set({ contactIdx: i })}
            onClick={() => set({ contactIdx: i })}
          />
        ))}
        <span className="section-header" style={{ paddingBottom: 5, margin: '22px 0 4px' }}>SEND A MESSAGE</span>
        <form onSubmit={(e) => { e.preventDefault(); send(); }}>
          {FIELDS.map((f, j) => (
            <SettingsRow key={f.key} label={f.label} className="d-field" selected={s.contactIdx === n + j} onHover={() => set({ contactIdx: n + j })}>
              <input
                ref={(el) => { refs.current[j] = el; }}
                className="settings-row__input"
                name={f.key}
                type={f.type}
                placeholder={s.contactIdx === n + j ? f.ph : '—'}
                value={form[f.key]}
                onFocus={() => set({ contactIdx: n + j })}
                onChange={(e) => setField(f.key, e.target.value)}
              />
            </SettingsRow>
          ))}
          <button
            type="submit"
            className={`btn-reset d-send${s.contactIdx === n + FIELDS.length ? ' is-selected' : ''}`}
            onMouseEnter={() => set({ contactIdx: n + FIELDS.length })}
          >
            SEND TRANSMISSION
          </button>
        </form>
      </div>
      <div className="d-contact-side">
        <div className="d-transmission">
          <TransmissionWindow height={150} portrait={MEDIA.portrait || undefined} />
          <span className="d-corner d-corner--tl" />
          <span className="d-corner d-corner--br" />
        </div>
        <div style={{ marginTop: 18, width: 420 }}>
          <InfoBox>Based in the GTA. Open to new grad software and AI engineering roles.</InfoBox>
        </div>
      </div>
    </div>
  );
}
