import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  AbilityCard, ChapterCard, CutCornerButton, InfoBox, ListBar, MediaPlaceholder, MenuItem, NewsTicker,
  ResultCard, SectionHeader, SettingsRow, StatTile, SubOptionRow, TransmissionWindow,
} from '../components';
import {
  ABOUT, AWARDS, CATS, EMAIL, EXPERIENCE, LINKS, MEDIA, NETWORKS, NEWS, RESULT_CARDS, RESUME_HREF, SKILLS,
  catIds, projectById, skillUse, techCode,
} from '../data';
import { ABOUT_TABS, listIds, type AppState } from './state';

export interface Ctx {
  s: AppState;
  /** Update selection without leaving the screen. */
  set: (patch: Partial<AppState>) => void;
  /** Navigate (animated, pushes history). */
  go: (patch: Partial<AppState>) => void;
}

const titleCase = (t: string) => t.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

function Head({ title }: { title: string }) {
  return (
    <div className="m-head">
      <h1 className="m-title">{title}</h1>
      <div className="m-hair" />
    </div>
  );
}

/** Horizontal strip that keeps the selected child scrolled into view. */
function Strip({ selected, children, className }: { selected: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const strip = ref.current;
    const el = strip?.children[selected] as HTMLElement | undefined;
    if (!strip || !el) return;
    const left = el.offsetLeft;
    const right = left + el.offsetWidth;
    if (left < strip.scrollLeft || right > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({ left: Math.max(0, left - 20), behavior: 'smooth' });
    }
  }, [selected]);
  return <div ref={ref} className={className ? `m-strip ${className}` : 'm-strip'}>{children}</div>;
}

/* ------------------------------------------------------------------ home */

export const MENU = [
  { id: 'projects', label: 'PROJECTS', subs: ['Featured', 'Hackathons', 'All Projects'], isNew: true },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'about', label: 'ABOUT', subs: ABOUT_TABS },
  { id: 'skills', label: 'SKILLS' },
  { id: 'contact', label: 'CONTACT' },
  { id: 'resume', label: 'RÉSUMÉ', special: true },
] as const satisfies readonly { id: string; label: string; subs?: readonly string[]; isNew?: boolean; special?: boolean }[];

export function activateMenu({ go, set }: Ctx, i: number, j: number) {
  const m = MENU[i];
  set({ menuIdx: i, subIdx: j });
  switch (m.id) {
    case 'projects': {
      const listKey = (['featured', 'hackathons', 'all'] as const)[j] ?? 'featured';
      const ids = listIds({ listKey, catIdx: 0 });
      go({ screen: 'projects', listKey, catIdx: 0, projId: ids[0] });
      break;
    }
    case 'about': go({ screen: 'about', aboutTab: j }); break;
    case 'resume': window.open(RESUME_HREF, '_blank', 'noopener'); break;
    default: go({ screen: m.id });
  }
}

export function HomeScreen(ctx: Ctx) {
  const { s, set, go } = ctx;
  const tap = (i: number) => {
    const m = MENU[i];
    // First tap on an item with options focuses it and reveals the options; a second tap opens it.
    if ('subs' in m && s.menuIdx !== i) set({ menuIdx: i, subIdx: 0 });
    else activateMenu(ctx, i, s.menuIdx === i ? s.subIdx : 0);
  };
  return (
    <div className="m-home">
      <div className="m-hero">
        <h1 className="m-hero__name">TAIMOOR<br />ALEEM</h1>
        <div className="m-hero__roles">
          <div className="m-hero__rule" />
          <div className="m-hero__role"><span>AI ENGINEER</span><span>SOFTWARE DEVELOPER</span></div>
        </div>
      </div>
      <nav className="m-menu" aria-label="Main">
        {MENU.map((m, i) => {
          const focused = s.menuIdx === i;
          return (
            <div key={m.id} style={{ display: 'contents' }}>
              <MenuItem
                size="md"
                label={m.label}
                focused={focused}
                special={'special' in m}
                isNew={'isNew' in m}
                onClick={() => tap(i)}
              />
              {focused && 'subs' in m && (
                <SubOptionRow
                  className="m-menu__subs"
                  label={`${m.label} options`}
                  options={[...m.subs]}
                  selected={s.subIdx}
                  onSelect={(j) => activateMenu(ctx, i, j)}
                />
              )}
            </div>
          );
        })}
      </nav>
      <div className="m-home__news">
        <NewsTicker lead={NEWS.lead} hl={NEWS.hl} onClick={() => go({ screen: 'briefing', listKey: 'featured', projId: NEWS.projectId })} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- projects */

export function ProjectsScreen({ s, set, go }: Ctx) {
  const ids = listIds(s);
  const projId = ids.includes(s.projId) ? s.projId : ids[0];
  const p = projectById(projId)!;
  const idx = ids.indexOf(projId);
  const title = { featured: 'PROJECTS', hackathons: 'HACKATHONS', all: 'ALL PROJECTS' }[s.listKey];
  return (
    <>
      <Head title={title} />
      <div className="m-fixed">
        {s.listKey === 'all' && (
          <SubOptionRow
            className="m-strip m-filter"
            label="Category"
            options={CATS.map((c) => `${titleCase(c)} ${catIds(CATS.indexOf(c)).length}`)}
            selected={s.catIdx}
            onSelect={(i) => set({ catIdx: i, projId: catIds(i)[0] })}
          />
        )}
        <Strip selected={idx}>
          {ids.map((id) => {
            const q = projectById(id)!;
            const sel = id === projId;
            return (
              <ListBar
                key={id}
                label={q.name}
                selected={sel}
                isNew={q.isNew}
                featured={q.featured}
                onClick={() => (sel ? go({ screen: 'briefing', projId: id }) : set({ projId: id }))}
              />
            );
          })}
        </Strip>
      </div>
      <div className="m-body" key={projId}>
        <MediaPlaceholder label={p.media} src={p.image} tone="warm" />
        <div className="m-stack2">
          <span className="m-gold">{p.gold}</span>
          <span className="m-blue">{p.blue}</span>
        </div>
        {p.stats.map((st) => (
          <StatTile
            key={st.label}
            label={st.label}
            value={st.value}
            caption={st.caption}
            slots={st.tech.map((t) => ({ code: techCode(t), name: t }))}
          />
        ))}
        <button type="button" className="btn-reset m-hint" onClick={() => go({ screen: 'briefing', projId })}>
          Tap the selected project to open the full briefing
        </button>
      </div>
    </>
  );
}

/* -------------------------------------------------------------- briefing */

export function BriefingScreen({ s, go }: Ctx) {
  const ids = listIds(s);
  const p = projectById(s.projId) ?? projectById(ids[0])!;
  const i = Math.max(0, ids.indexOf(p.id));
  const step = (d: number) => go({ screen: 'briefing', projId: ids[(i + d + ids.length) % ids.length] });
  return (
    <>
      <Head title="BRIEFING" />
      <div className="m-body m-body--tight" key={p.id}>
        <span className="m-name">{p.short}</span>
        <MediaPlaceholder label={p.media} src={p.image} />
        <div className="m-stack6">
          <span className="m-gold m-gold--lg">{p.gold}</span>
          <span className="m-blue">{p.blue}</span>
          <p className="m-para m-para--first">
            {p.desc.map((d, k) => (d.hl ? <span key={k} className="m-hl">{d.t}</span> : d.t))}
          </p>
        </div>
        {p.cards.map(([t, d], k) => (
          <AbilityCard key={t} index={k + 1} title={t} desc={d} core={k === 3} />
        ))}
        {(p.awards || p.perks) && (
          <div className="m-chips">
            {p.awards?.map((a) => <span key={a} className="m-chip m-chip--gold">{a}</span>)}
            {p.perks?.map((a) => <span key={a} className="m-chip">{a}</span>)}
          </div>
        )}
        <SectionHeader style={{ marginTop: 6 }}>STACK</SectionHeader>
        <div className="m-chips">
          {p.stack.map((t) => <span key={t} className="m-chip">{techCode(t)} · {t}</span>)}
        </div>
        <div className="m-btns">
          {p.btns.map((b) => <CutCornerButton key={b.label} href={b.href} disabled={!b.href}>{b.label}</CutCornerButton>)}
        </div>
        {ids.length > 1 && (
          <div className="m-pager">
            <button type="button" className="btn-reset" onClick={() => step(-1)}>◀ PREV</button>
            <span>{String(i + 1).padStart(2, '0')} / {String(ids.length).padStart(2, '0')}</span>
            <button type="button" className="btn-reset" onClick={() => step(1)}>NEXT ▶</button>
          </div>
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------ experience */

export function ExperienceScreen({ s, set }: Ctx) {
  const e = EXPERIENCE[s.expIdx];
  return (
    <>
      <Head title="SERVICE RECORD" />
      <div className="m-fixed">
        <Strip selected={s.expIdx}>
          {EXPERIENCE.map((x, i) => (
            <ListBar key={x.name} label={x.name} selected={i === s.expIdx} onClick={() => set({ expIdx: i })} />
          ))}
        </Strip>
      </div>
      <div className="m-body m-body--tight" key={s.expIdx}>
        <ChapterCard compact num={e.num} company={e.company} meta={e.meta} />
        <SectionHeader style={{ marginTop: 6 }}>{e.section}</SectionHeader>
        {e.cards.map(([t, d], k) => <AbilityCard key={t} index={k + 1} title={t} desc={d} core={k === 3} />)}
        {e.extra && <p className="m-para">{e.extra}</p>}
        {e.btn && (
          <div className="m-btns">
            <CutCornerButton href={e.btn.href} disabled={!e.btn.href}>{e.btn.label}</CutCornerButton>
          </div>
        )}
      </div>
    </>
  );
}

/* ----------------------------------------------------------------- about */

export function AboutScreen({ s, set }: Ctx) {
  const title = ['PROFILE', 'AWARDS', 'NETWORKS'][s.aboutTab];
  return (
    <>
      <Head title={title} />
      <div className="m-fixed">
        <SubOptionRow className="m-filter" label="About sections" options={ABOUT_TABS} selected={s.aboutTab} onSelect={(i) => set({ aboutTab: i })} />
      </div>
      <div className="m-body" key={s.aboutTab}>
        {s.aboutTab === 0 && ABOUT.map((a) => (
          <section key={a.label} className="m-stack6">
            <SectionHeader>{a.label}</SectionHeader>
            {a.pending ? <p className="m-para">Coming soon.</p> : a.paras.map((t) => <p key={t} className="m-para">{t}</p>)}
          </section>
        ))}
        {s.aboutTab === 1 && (
          <>
            <Strip selected={0} className="m-strip--cards">
              {RESULT_CARDS.map((r) => <ResultCard key={r.label} label={r.label} place={r.place} />)}
            </Strip>
            <div className="m-stack6">
              {AWARDS.map((a) => (
                <div key={a.event} className="m-award">
                  <span className="m-award__event">{a.event}</span>
                  <span className="m-award__result">{a.result}</span>
                  <span className="m-award__meta">{a.team} · {a.year}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {s.aboutTab === 2 && NETWORKS.map((n) => (
          <section key={n.name} className="m-net">
            <span className="m-net__name">{n.name}</span>
            <span className="m-net__role">{n.role}{n.dates ? ` · ${n.dates}` : ''}</span>
            {n.text && <p className="m-para">{n.text}</p>}
          </section>
        ))}
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- skills */

export function SkillsScreen({ s, set }: Ctx) {
  let flat = 0;
  return (
    <>
      <Head title="LOADOUT CONFIG" />
      <div className="m-body">
        {SKILLS.map(([group, rows]) => (
          <section key={group} style={{ display: 'flex', flexDirection: 'column' }}>
            <SectionHeader style={{ marginBottom: 4 }}>{group}</SectionHeader>
            {rows.map(([name, vals]) => {
              const idx = flat++;
              const sel = idx === s.skillIdx;
              const v = s.skillVal % vals.length;
              const cycle = (d: number) => set({ skillVal: (v + d + vals.length) % vals.length });
              return (
                <div key={name}>
                  <SettingsRow
                    size="md"
                    label={name}
                    selected={sel}
                    value={sel ? vals[v] : vals.join(', ')}
                    onPrev={vals.length > 1 ? () => cycle(-1) : undefined}
                    onNext={vals.length > 1 ? () => cycle(1) : undefined}
                    onClick={() => !sel && set({ skillIdx: idx, skillVal: 0 })}
                  />
                  {sel && (
                    <div className="m-skill-use"><b>{vals[v]}</b> · {skillUse(name, vals[v])}</div>
                  )}
                </div>
              );
            })}
          </section>
        ))}
      </div>
    </>
  );
}

/* --------------------------------------------------------------- contact */

const FIELDS = [
  { key: 'name', label: 'Name', type: 'text', auto: 'name' },
  { key: 'email', label: 'Email', type: 'email', auto: 'email' },
  { key: 'message', label: 'Message', type: 'text', auto: 'off' },
] as const;

type FormKey = (typeof FIELDS)[number]['key'];

export function ContactScreen({ s, set }: Ctx) {
  const [form, setForm] = useState<Record<FormKey, string>>({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const canSend = form.message.trim().length > 0;

  const send = () => {
    if (!canSend) return;
    const subject = `Portfolio message${form.name ? ` from ${form.name}` : ''}`;
    const body = `${form.message}\n\n${form.name}${form.email ? ` <${form.email}>` : ''}`.trim();
    // No backend: hand the message to the visitor's mail client.
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <>
      <Head title="COMMS" />
      <div className="m-body" style={{ gap: 0, paddingTop: 4 }}>
        <TransmissionWindow height={104} portrait={MEDIA.portrait || undefined} />
        <SectionHeader style={{ margin: '22px 0 4px' }}>CHANNELS</SectionHeader>
        {LINKS.map((l, i) => (
          <SettingsRow
            key={l.label}
            size="md"
            label={l.label}
            gold={l.gold}
            value={l.short}
            arrows={i === 0}
            selected={s.contactIdx === i}
            href={l.href}
            onClick={() => set({ contactIdx: i })}
          />
        ))}
        <SectionHeader style={{ margin: '18px 0 4px' }}>SEND A MESSAGE</SectionHeader>
        <form onSubmit={(e) => { e.preventDefault(); send(); }}>
          {FIELDS.map((f, j) => (
            <SettingsRow key={f.key} size="md" label={f.label} selected={s.contactIdx === LINKS.length + j}>
              <input
                className="settings-row__input"
                name={f.key}
                type={f.type}
                autoComplete={f.auto}
                placeholder="—"
                value={form[f.key]}
                onFocus={() => set({ contactIdx: LINKS.length + j })}
                onChange={(e) => setForm((v) => ({ ...v, [f.key]: e.target.value }))}
              />
            </SettingsRow>
          ))}
          <button type="submit" className="btn-reset m-send" disabled={!canSend}>SEND TRANSMISSION</button>
        </form>
      </div>
      {sent && (
        <div className="m-overlay" onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}>
          <InfoBox>Transmission ready. Your mail app should open with the message filled in. Tap to close.</InfoBox>
        </div>
      )}
    </>
  );
}
