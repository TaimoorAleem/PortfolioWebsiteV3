import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  AbilityCard, ChapterCard, CutCornerButton, InfoBox, ListBar, Meter, Trophy, TrophyCount, MenuItem,
  SectionHeader, SettingsRow, Slideshow, SubOptionRow,
} from '../components';
import {
  AWARDS, BLOGS, EMAIL, EXPERIENCE, LEADERSHIP, LINKS, MEDIA, NOW_WORKING, PROFILE, PROJECT_TABS, RESUME, SKILLS,
  awardSlides, blogCover, blogDate, blogSlides, chapterSlides, projectAwards, projectById, projectLinks, projectSlides, skillUse, tabIds, techCode,
} from '../data';
import { Gallery, Hobbies } from '../shared/Hobbies';
import { useLightbox } from '../shared/Lightbox';
import { EXP_TABS, currentProjectId, openProject, type AppState } from './state';

export interface Ctx {
  s: AppState;
  /** Update selection without leaving the screen. */
  set: (patch: Partial<AppState>) => void;
  /** Navigate (animated, pushes history). */
  go: (patch: Partial<AppState>) => void;
}

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
  { id: 'profile', label: 'PROFILE' },
  { id: 'experience', label: 'EXPERIENCE', subs: EXP_TABS },
  { id: 'projects', label: 'PROJECTS', subs: PROJECT_TABS.map((t) => t.label), isNew: true },
  { id: 'skills', label: 'SKILLS' },
  { id: 'about', label: 'AWARDS' },
  { id: 'blogs', label: 'BLOGS' },
  { id: 'contact', label: 'CONTACT' },
  { id: 'resume', label: 'RÉSUMÉ', special: true },
] as const satisfies readonly { id: string; label: string; subs?: readonly string[]; isNew?: boolean; special?: boolean }[];

export function activateMenu({ go, set }: Ctx, i: number, j: number) {
  const m = MENU[i];
  set({ menuIdx: i, subIdx: j });
  switch (m.id) {
    case 'projects': go({ screen: 'projects', projTab: j, projId: tabIds(j)[0] ?? '' }); break;
    case 'experience': go({ screen: 'experience', expTab: j }); break;
    case 'about': go({ screen: 'about', awardIdx: -1 }); break;
    case 'blogs': go({ screen: 'blogs', blogIdx: 0 }); break;
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
        <div className="m-now">
          <span className="m-now__tag">CURRENTLY WORKING ON:</span>
          <ul className="m-now__list">
            {NOW_WORKING.map((n) => (
              <li key={n.label}>
                <button
                  type="button"
                  className="btn-reset"
                  onClick={() => go(n.project ? openProject(n.project, s.projTab) : { screen: 'experience', expTab: 1, leadIdx: n.leadership ?? 0 })}
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- projects */

export function ProjectsScreen({ s, set, go }: Ctx) {
  const lightbox = useLightbox();
  const ids = tabIds(s.projTab);
  const projId = currentProjectId(s);
  const p = projId ? projectById(projId) : undefined;
  const idx = projId ? ids.indexOf(projId) : 0;
  const links = p ? projectLinks(p) : [];
  return (
    <>
      <Head title="PROJECTS" />
      <div className="m-fixed">
        <SubOptionRow
          className="m-strip m-filter"
          label="Project type"
          options={PROJECT_TABS.map((t, i) => `${t.label} | ${tabIds(i).length}`)}
          selected={s.projTab}
          onSelect={(i) => set({ projTab: i, projId: tabIds(i)[0] ?? '' })}
        />
        <Strip selected={idx} key={s.projTab}>
          {ids.map((id) => {
            const q = projectById(id)!;
            return (
              <ListBar key={id} label={q.name} selected={id === projId} isNew={q.isNew} featured={q.featured} trailing={projectAwards(id).length ? <TrophyCount n={projectAwards(id).length} /> : undefined} onClick={() => set({ projId: id })} />
            );
          })}
        </Strip>
      </div>
      {p ? (
        <div className="m-body m-body--tight" key={p.id}>
          <span className="m-name">{p.short}</span>
          <Slideshow contain slides={projectSlides(p)} onOpen={(i) => lightbox.open(p.short, projectSlides(p), i, p.gold)} />
          <div className="m-stack6">
            <span className="m-gold m-gold--lg">{p.gold}</span>
            <span className="m-blue">{p.blue}</span>
            <p className="m-para m-para--first">
              {p.desc.map((d, k) => (d.hl ? <span key={k} className="m-hl">{d.t}</span> : d.t))}
            </p>
          </div>
          <div className="m-chips">
            {p.stack.map((t) => <span key={t} className="m-chip">{techCode(t)} · {t}</span>)}
          </div>
          {links.length > 0 && (
            <div className="m-btns m-btns--row">
              {links.map((b) => <CutCornerButton key={b.label} href={b.href}>{b.label}</CutCornerButton>)}
            </div>
          )}
          {projectAwards(p.id).length > 0 && (
            <div className="proj-awards">
              {projectAwards(p.id).map((a) => (
                <button key={a.result} type="button" className="btn-reset proj-award" onClick={() => go({ screen: 'about', awardIdx: AWARDS.indexOf(a) })}>
                  <Trophy className="trophy proj-award__icon" />
                  <span className="proj-award__result">{a.result}</span>
                  <span className="proj-award__event">{a.event}</span>
                </button>
              ))}
            </div>
          )}
          <SectionHeader style={{ marginTop: 6 }}>FEATURES</SectionHeader>
          {p.cards.map(([t, d], k) => (
            <AbilityCard key={t} index={k + 1} title={t} desc={d} />
          ))}
          {lightbox.element}
        </div>
      ) : (
        <div className="m-body"><p className="m-para">No projects in this tab yet.</p></div>
      )}
    </>
  );
}

/* ------------------------------------------------------------ experience */

export function ExperienceScreen({ s, set }: Ctx) {
  const list = s.expTab === 1 ? LEADERSHIP : EXPERIENCE;
  const idx = Math.min(s.expTab === 1 ? s.leadIdx : s.expIdx, list.length - 1);
  const e = list[idx];
  const pick = (i: number) => set(s.expTab === 1 ? { leadIdx: i } : { expIdx: i });
  return (
    <>
      <Head title={s.expTab === 1 ? 'MULTIPLAYER' : 'CAMPAIGN'} />
      <div className="m-fixed">
        <SubOptionRow className="m-filter" label="Experience type" options={EXP_TABS} selected={s.expTab} onSelect={(i) => set({ expTab: i })} />
        <Strip selected={idx} key={s.expTab}>
          {list.map((x, i) => (
            <ListBar key={x.name} label={x.name} selected={i === idx} onClick={() => pick(i)} />
          ))}
        </Strip>
      </div>
      <div className="m-body m-body--tight" key={`${s.expTab}-${idx}`}>
        <ChapterCard compact logo={e.logo ?? ''} num={e.num} company={e.company} meta={e.meta} />
        <SectionHeader style={{ marginTop: 6 }}>{e.section}</SectionHeader>
        {e.cards.map(([t, d], k) => <AbilityCard key={t} index={k + 1} title={t} desc={d} core={k === 3} />)}
        {e.extra && <p className="m-para">{e.extra}</p>}
        {e.btn && (
          <div className="m-btns">
            <CutCornerButton href={e.btn.href} disabled={!e.btn.href}>{e.btn.label}</CutCornerButton>
          </div>
        )}
        {e.events && e.events.length > 0 && (
          <>
            <SectionHeader style={{ marginTop: 6 }}>EVENTS ORGANIZED · {e.events.length}</SectionHeader>
            <ol className="d-events m-events">
              {e.events.map((ev) => (
                <li key={ev.name} className="d-event">
                  <span className="d-event__date">{ev.date}</span>
                  <span className="d-event__name">{ev.name}</span>
                  {ev.note && <span className="d-event__note">{ev.note}</span>}
                </li>
              ))}
            </ol>
          </>
        )}
        <SectionHeader style={{ marginTop: 6 }}>GALLERY</SectionHeader>
        <Gallery title={e.company} slides={chapterSlides(e)} className="gallery m-gallery" />
      </div>
    </>
  );
}

/* ----------------------------------------------------------------- about */

export function AboutScreen({ s, set, go }: Ctx) {
  const lightbox = useLightbox();
  return (
    <>
      <Head title="AWARDS" />
      <div className="m-body" style={{ gap: 6 }}>
        <span className="m-award-note">{AWARDS.length} on record · tap a row for the story</span>
        {AWARDS.map((a, i) => {
          const open = i === s.awardIdx;
          const slides = awardSlides(a);
          return (
            <div key={`${a.event}-${a.result}`} className={`m-award${open ? ' is-open' : ''}${i === 0 ? ' is-first' : ''}`}>
              <button type="button" className="btn-reset m-award__main" aria-expanded={open} onClick={() => set({ awardIdx: open ? -1 : i })}>
                <span className="m-award__event">{a.result}</span>
                <span className="m-award__result">{a.event}</span>
                <span className="m-award__meta">{a.team} · {a.year}</span>
              </button>
              <div className="m-award__more">
                <div className="m-award__more-inner">
                  <button
                    type="button"
                    className="btn-reset m-award__img"
                    tabIndex={open ? 0 : -1}
                    aria-label={`View ${a.event} photos`}
                    onClick={() => lightbox.open(a.event, slides, 0, a.result)}
                  >
                    {slides[0].src ? <img src={slides[0].src} alt={a.event} /> : <span>event photo</span>}
                    <span className="m-award__zoom">⤢ VIEW{slides.length > 1 ? ` · ${slides.length}` : ''}</span>
                  </button>
                  <p className="m-para">{a.details}</p>
                  {a.project && (
                    <CutCornerButton onClick={() => go(openProject(a.project!, s.projTab))}>
                      VIEW {projectById(a.project)?.short.toUpperCase()}
                    </CutCornerButton>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {lightbox.element}
      </div>
    </>
  );
}

/* ----------------------------------------------------------------- blogs */

export function BlogsScreen({ s, set, go }: Ctx) {
  const b = BLOGS[s.blogIdx] ?? BLOGS[0];
  const lightbox = useLightbox();
  const cover = blogCover(b);
  const related = b.project ? projectById(b.project) : undefined;
  return (
    <>
      <Head title="DEV LOGS" />
      {BLOGS.length > 1 && (
        <div className="m-fixed">
          <Strip selected={s.blogIdx}>
            {BLOGS.map((x, i) => (
              <ListBar key={x.id} label={x.short} selected={i === s.blogIdx} onClick={() => set({ blogIdx: i })} />
            ))}
          </Strip>
        </div>
      )}
      <article className="m-body m-body--tight" key={b.id}>
        <button type="button" className="btn-reset blog-cover" onClick={() => lightbox.open(b.title, blogSlides(b), 0, b.site)}>
          {cover ? <img src={cover} alt="" /> : <span className="blog-cover__ph">cover image</span>}
          <span className="ss__open-tag">⤢ VIEW</span>
        </button>
        <div className="m-stack6">
          <span className="blog-meta">{b.site.toUpperCase()} · {blogDate(b.date)}</span>
          <a className="m-blog__title" href={b.href} target="_blank" rel="noopener noreferrer">{b.title}</a>
        </div>
        {b.quote && <blockquote className="blog-quote">{b.quote}</blockquote>}
        <p className="m-para">{b.summary}</p>
        <div className="m-btns m-btns--row">
          <CutCornerButton href={b.href}>READ ON {b.site.toUpperCase()}</CutCornerButton>
          {related && (
            <CutCornerButton onClick={() => go(openProject(related.id, s.projTab))}>VIEW {related.short.toUpperCase()}</CutCornerButton>
          )}
        </div>
        <SectionHeader style={{ marginTop: 6 }}>IN THIS POST</SectionHeader>
        <ol className="blog-toc">{b.sections.map((t) => <li key={t}>{t}</li>)}</ol>
        {b.images && b.images.length > 0 && (
          <>
            <SectionHeader style={{ marginTop: 6 }}>FIGURES</SectionHeader>
            <Gallery title={b.title} slides={b.images} className="gallery m-gallery" />
          </>
        )}
        {lightbox.element}
      </article>
    </>
  );
}

/* --------------------------------------------------------------- profile */

export function ProfileScreen({ s, go }: Ctx) {
  const p = PROFILE;
  return (
    <>
      <Head title="PROFILE" />
      <div className="m-body">
        <div className="m-id">
          <div className="m-id__portrait">
            {MEDIA.portrait ? <img src={MEDIA.portrait} alt={p.name} /> : <span>portrait</span>}
          </div>
          <div className="m-id__text">
            <span className="m-id__name">{p.name}</span>
            <span className="m-blue">{p.role}</span>
            <span className="m-id__status"><span className="m-id__dot" />{p.status}</span>
          </div>
        </div>
        {p.bio && <p className="m-bio">{p.bio}</p>}
        <div className="m-pstats">
          {p.stats.map((st) => (
            <div key={st.label} className="m-pstat">
              <span className="m-pstat__value">{st.value}</span>
              <span className="m-pstat__label">{st.label}</span>
              <span className="m-pstat__caption">{st.caption}</span>
              <Meter lit={st.meter} />
            </div>
          ))}
        </div>
        <div className="m-stack6">
          <SectionHeader>CURRENT ROLE</SectionHeader>
          <div className="m-mission">
            <span className="m-gold">{p.now.title}</span>
            <p className="m-para">{p.now.text}</p>
            <CutCornerButton onClick={() => go(openProject('ember', s.projTab))}>VIEW EMBER</CutCornerButton>
          </div>
        </div>
        <div className="m-stack6">
          <SectionHeader>FILE</SectionHeader>
          <div>{p.facts.map(([k, v]) => <SettingsRow key={k} label={k} value={v} className="m-fact" />)}</div>
        </div>
        <div className="m-stack6">
          <SectionHeader>HOBBIES &amp; INTERESTS</SectionHeader>
          <Hobbies />
        </div>
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
        <SectionHeader style={{ margin: '0 0 4px' }}>CHANNELS</SectionHeader>
        {LINKS.map((l, i) => (
          <SettingsRow
            key={l.label}
            size="md"
            label={l.label}
            gold={l.gold}
            value={l.short}
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

/* ---------------------------------------------------------------- résumé */

export function ResumeScreen(_: Ctx) {
  const r = RESUME;
  return (
    <>
      <Head title="RÉSUMÉ" />
      <div className="m-body">
        {(r.label || r.note) && (
          <div className="m-stack6">
            {r.label && <span className="m-name" style={{ fontSize: 24, lineHeight: '30px' }}>{r.label}</span>}
            {r.note && <p className="m-para">{r.note}</p>}
          </div>
        )}
        <div className="m-resume__viewer">
          <iframe title="Résumé" src={r.preview} allow="autoplay" />
        </div>
        <div className="m-btns m-btns--row">
          <CutCornerButton href={r.download}>DOWNLOAD PDF</CutCornerButton>
          <CutCornerButton href={r.view}>OPEN IN DRIVE</CutCornerButton>
        </div>
      </div>
    </>
  );
}
