import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import {
  AbilityCard, CutCornerButton, ListBar, Meter, Trophy, TrophyCount, ListGroupHeader, MenuItem, SettingsRow, Slideshow,
  SubOptionRow,
} from '../components';
import {
  AWARDS, BLOGS, EXPERIENCE, LEADERSHIP, LINKS, MEDIA, NOW_WORKING, PROFILE, PROJECT_TABS, RESUME, SKILLS,
  awardSlides, blogCover, blogDate, blogSlides, chapterSlides, projectAwards, projectById, projectLinks, projectSlides, skillUse, tabIds, type Chapter,
} from '../data';
import { Gallery, Hobbies } from '../shared/Hobbies';
import { useLightbox } from '../shared/Lightbox';
import { D_MENU, EXP_TABS, openProjectPatch, skillRows, titleCase, type DState } from './state';

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

/** Index of the option pill closest to the cursor horizontally. */
function pillUnderCursor(e: MouseEvent<HTMLElement>): number {
  const pills = e.currentTarget.closest('.d-menu__item')?.querySelectorAll('.sub-opt') ?? [];
  let best = 0;
  let bestD = Infinity;
  pills.forEach((p, j) => {
    const r = p.getBoundingClientRect();
    const d = e.clientX < r.left ? r.left - e.clientX : e.clientX > r.right ? e.clientX - r.right : 0;
    if (d < bestD) { bestD = d; best = j; }
  });
  return best;
}

export function DHome({ s, set, activate, go }: DCtx) {
  return (
    <div className="d-screen">
      <div className="d-news">
        <span className="d-news__tag">CURRENTLY WORKING ON:</span>
        <ul className="d-news__lines">
          {NOW_WORKING.map((n) => (
            <li key={n.label}>
              <button
                type="button"
                className="btn-reset"
                onClick={() => go(n.project ? openProjectPatch(n.project, s.projTab) : { screen: 'leadership', leadIdx: n.leadership ?? 0 })}
              >
                {n.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="d-hero">
        <h1 className="d-hero__name">TAIMOOR ALEEM</h1>
        <div className="d-hero__divider">
          <div className="d-hero__rule" />
          <span className="d-build">v2026.11</span>
        </div>
        <div className="d-hero__roles"><span>AI ENGINEER</span><span>SOFTWARE DEVELOPER</span></div>
      </div>

      <nav className="d-menu" aria-label="Main">
        {D_MENU.map((m, i) => {
          const f = i === s.menuIdx;
          const subs = 'subs' in m ? m.subs : null;
          // Over the word itself, highlight whichever option sits under the cursor.
          const track = (e: MouseEvent<HTMLElement>) => {
            const j = subs ? pillUnderCursor(e) : 0;
            if (s.menuIdx !== i || s.subIdx !== j) set({ menuIdx: i, subIdx: j });
          };
          return (
            <div key={m.id} className="d-menu__item">
              <div className="d-menu__row" onMouseMove={track} onMouseEnter={track}>
                <MenuItem
                  label={m.label}
                  focused={f}
                  special={'special' in m}
                  isNew={'isNew' in m}
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
        <button type="button" className="btn-reset d-latest__hero" onClick={() => go(openProjectPatch('ember', s.projTab))}>
          {MEDIA.latest && <img className="d-img" src={MEDIA.latest} alt="Ember team" />}
          {!MEDIA.latest && <span className="d-latest__word">LATEST</span>}
          {!MEDIA.latest && <span className="d-latest__scan" />}
          {!MEDIA.latest && <span className="d-latest__cap">ember team photo</span>}
        </button>
        <div className="d-latest__body">
          <span className="d-latest__title">IgnisXR: Ember, an XR helmet system for firefighters</span>
          <span className="d-latest__sub">Top 3 in North America at the Google Solution Challenge.</span>
        </div>
        <div className="d-latest__tiles">
          <button type="button" className="btn-reset d-latest__tile" onClick={() => go({ screen: 'leadership', leadIdx: 0 })}>
            {MEDIA.bearhacks && <img className="d-img" src={MEDIA.bearhacks} alt="" />}
            <span>BearHacks 2026: Mississauga's largest hackathon</span>
          </button>
          <button type="button" className="btn-reset d-latest__tile" onClick={() => go(openProjectPatch('cricket', s.projTab))}>
            {MEDIA.cricket && <img className="d-img" src={MEDIA.cricket} alt="" />}
            <span>AI Cricket Coach: first place capstone</span>
          </button>
        </div>
      </div>

      <div className="d-sig">
        <span>© 2026 Taimoor Aleem</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- projects */

export function DProjects({ s, set, go }: DCtx) {
  const ids = tabIds(s.projTab);
  const pi = Math.min(s.projIdx, Math.max(0, ids.length - 1));
  const p = ids.length ? projectById(ids[pi])! : null;
  const lightbox = useLightbox();
  return (
    <div className="d-screen">
      <div className="d-tabs">
        <SubOptionRow
          label="Project type"
          options={PROJECT_TABS.map((t, i) => `${t.label} | ${tabIds(i).length}`)}
          selected={s.projTab}
          onSelect={(i) => set({ projTab: i, projIdx: 0, slideIdx: 0 })}
        />
      </div>
      <div style={{ position: 'absolute', left: 80, top: 200, width: 200 }}>
        <ListGroupHeader>{PROJECT_TABS[s.projTab].label}</ListGroupHeader>
        <div style={{ marginTop: 10 }}>
          <SlideList
            width={200}
            sel={pi}
            items={ids.map((id) => { const q = projectById(id)!; const n = projectAwards(id).length; return { key: id, label: q.short, isNew: q.isNew, featured: q.featured, trailing: n ? <TrophyCount n={n} /> : undefined }; })}
            onHover={(i) => { if (i !== pi) set({ projIdx: i, slideIdx: 0 }); }}
          />
        </div>
      </div>
      <Rule left={300} />
      {p ? (
        <div className="d-brief" key={p.id}>
          <div className="d-brief__top">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span className="d-h30">{p.short}</span>
              <Slideshow
                contain
                slides={projectSlides(p)}
                index={s.slideIdx}
                onIndex={(i) => set({ slideIdx: i })}
                onOpen={(i) => lightbox.open(p.short, projectSlides(p), i, p.gold)}
              />
            </div>
            <div className="d-brief__info">
              <span className="d-gold d-gold--24">{p.gold}</span>
              <span className="d-blue">{p.blue}</span>
              <p className="d-para">
                {p.desc.map((d, k) => (d.hl ? <span key={k} className="d-hl">{d.t}</span> : d.t))}
              </p>
              <div className="d-stack-tags">
                {p.stack.map((t) => <span key={t}>{t}</span>)}
              </div>
              <div className="d-brief__btns">
                {projectLinks(p).map((b) => <CutCornerButton key={b.label} href={b.href}>{b.label}</CutCornerButton>)}
              </div>
              <ProjectAwards id={p.id} onOpen={(i) => go({ screen: 'awards', awardIdx: i })} />
            </div>
          </div>
          <div className="d-features">
            <span className="section-header">FEATURES</span>
            <div className="d-features__list">
              {p.cards.map(([t, d], k) => <AbilityCard key={t} inline index={k + 1} title={t} desc={d} />)}
            </div>
          </div>
          {lightbox.element}
        </div>
      ) : (
        <div className="d-brief"><span className="d-pending">NO PROJECTS IN THIS TAB YET</span></div>
      )}
    </div>
  );
}

/** Awards a project won, one row each; a row opens that award on the Awards page. */
function ProjectAwards({ id, onOpen }: { id: string; onOpen: (awardIdx: number) => void }) {
  const won = projectAwards(id);
  if (!won.length) return null;
  return (
    <div className="proj-awards">
      {won.map((a) => (
        <button key={a.result} type="button" className="btn-reset proj-award" onClick={() => onOpen(AWARDS.indexOf(a))}>
          <Trophy className="trophy proj-award__icon" />
          <span className="proj-award__result">{a.result}</span>
          <span className="proj-award__event">{a.event}</span>
          <span className="proj-award__year">{a.year}</span>
        </button>
      ))}
    </div>
  );
}

/* ----------------------------------------------- experience / leadership */

function DChapters({ set, go, list, idx, tab }: DCtx & { list: Chapter[]; idx: number; tab: 0 | 1 }) {
  const e = list[idx];
  const pick = (i: number) => set(tab === 0 ? { expIdx: i } : { leadIdx: i });
  return (
    <div className="d-screen">
      <div className="d-tabs">
        <SubOptionRow
          label="Experience type"
          options={EXP_TABS}
          selected={tab}
          onSelect={(i) => { if (i !== tab) go({ screen: i === 0 ? 'experience' : 'leadership' }); }}
        />
      </div>
      <div style={{ position: 'absolute', left: 80, top: 200 }}>
        <SlideList width={220} sel={idx} items={list.map((x) => ({ key: x.name, label: x.name }))} onHover={pick} />
      </div>
      <Rule left={324} />
      <div className="d-chapter" key={`c${tab}${idx}`}>
        <span className="d-chapter__logo" aria-hidden>
          {e.logo ? <img src={e.logo} alt="" /> : <span>{e.company.charAt(0)}</span>}
        </span>
        <div className="d-chapter__text">
          <span className={`d-chapter__company${e.company.length > 20 ? ' d-chapter__company--long' : ''}`}>{e.company}</span>
          <span className="d-chapter__meta">{e.meta}</span>
        </div>
        <span className="d-chapter__num">{e.num}</span>
      </div>
      <div className="d-exp" key={`b${tab}${idx}`}>
        <div className={`d-exp__cols${e.events?.length ? ' d-exp__cols--2' : ''}`}>
          <div className="d-exp__col">
            <span className="section-header">{e.section}</span>
            <div className="d-exp__scroll">
              {e.cards.length > 0 && (
                <div className="d-cards d-cards--panel">
                  {e.cards.map(([t, d], k) => <AbilityCard key={t} icon index={k + 1} title={t} desc={d} core={k === 3} />)}
                </div>
              )}
              {e.extra && <span className="d-para">{e.extra}</span>}
              {e.btn && <div><CutCornerButton href={e.btn.href} disabled={!e.btn.href}>{e.btn.label}</CutCornerButton></div>}
            </div>
          </div>
          {e.events && e.events.length > 0 && (
            <div className="d-exp__col">
              <span className="section-header">EVENTS ORGANIZED · {e.events.length}</span>
              <ol className="d-exp__scroll d-events">
                {e.events.map((ev) => (
                  <li key={ev.name} className="d-event">
                    <span className="d-event__date">{ev.date}</span>
                    <span className="d-event__name">{ev.name}</span>
                    {ev.note && <span className="d-event__note">{ev.note}</span>}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
        <div className="d-exp__gallery">
          <span className="section-header">GALLERY</span>
          <Gallery title={e.company} slides={chapterSlides(e)} />
        </div>
      </div>
    </div>
  );
}

export const DExperience = (c: DCtx) => <DChapters {...c} list={EXPERIENCE} idx={c.s.expIdx} tab={0} />;
export const DLeadership = (c: DCtx) => <DChapters {...c} list={LEADERSHIP} idx={c.s.leadIdx} tab={1} />;

/* ---------------------------------------------------------------- awards */

export function DAwards({ s, set, go }: DCtx) {
  const openProject = (id: string) => go(openProjectPatch(id, s.projTab));
  const lightbox = useLightbox();
  return (
    <div className="d-screen">
      <div className="d-tabs d-awards__top">
        <div className="d-awards__tab">ON RECORD · {AWARDS.length}</div>
      </div>
      <div className="d-awards">
        <div className="d-award-list" onMouseLeave={() => set({ awardIdx: -1 })}>
          {AWARDS.map((a, i) => {
            const open = i === s.awardIdx;
            const slides = awardSlides(a);
            return (
              <div
                key={`${a.event}-${a.result}`}
                className={`d-award${open ? ' is-open' : ''}${i === 0 ? ' is-first' : ''}`}
                tabIndex={0}
                onMouseEnter={() => set({ awardIdx: i })}
                onFocus={() => set({ awardIdx: i })}
              >
                <div className="d-award__main">
                  <span className="d-award__year">{a.year}</span>
                  <span className="d-award__event">{a.result}</span>
                  <span className="d-award__result">{a.event}</span>
                  <span className="d-award__team">{a.team}</span>
                </div>
                <div className="d-award__more" aria-hidden={!open}>
                  <div className="d-award__more-inner">
                    <button
                      type="button"
                      className="btn-reset d-award__img"
                      tabIndex={open ? 0 : -1}
                      aria-label={`View ${a.event} photos`}
                      onClick={() => lightbox.open(a.event, slides, 0, a.result)}
                    >
                      {slides[0].src ? <img className="d-img" src={slides[0].src} alt={a.event} /> : <span>event photo</span>}
                      {slides.length > 1 && <span className="d-award__count">1 / {slides.length}</span>}
                      <span className="d-award__zoom">⤢ VIEW</span>
                    </button>
                    <div className="d-award__detail">
                      <p className="d-para">{a.details}</p>
                      {a.project && (
                        <CutCornerButton onClick={() => openProject(a.project!)}>VIEW {projectById(a.project)?.short.toUpperCase()}</CutCornerButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {lightbox.element}
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

/* --------------------------------------------------------------- profile */

export function DProfile({ s, go }: DCtx) {
  const p = PROFILE;
  return (
    <div className="d-screen">
      <div className="d-id">
        <div className="d-id__portrait">
          {MEDIA.portrait ? <img className="d-img" src={MEDIA.portrait} alt={p.name} /> : <span>portrait</span>}
          <span className="d-id__corner d-id__corner--tl" />
          <span className="d-id__corner d-id__corner--br" />
        </div>
        <span className="d-id__name">{p.name}</span>
        <span className="d-blue">{p.role}</span>
        <span className="d-id__status"><span className="d-id__dot" />{p.status}</span>
      </div>

      <div className="d-prof">
        {p.bio && <p className="d-prof__bio">{p.bio}</p>}

        <div className="d-prof__stats">
          {p.stats.map((st) => (
            <div key={st.label} className="d-pstat">
              <span className="d-pstat__value">{st.value}</span>
              <span className="d-pstat__label">{st.label}</span>
              <span className="d-pstat__caption">{st.caption}</span>
              <Meter lit={st.meter} />
            </div>
          ))}
        </div>

        <div className="d-prof__cols">
          <div className="d-prof__col">
            <span className="section-header">CURRENT ROLE</span>
            <div className="d-mission">
              <span className="d-gold">{p.now.title}</span>
              <p className="d-para">{p.now.text}</p>
              <CutCornerButton onClick={() => go(openProjectPatch('ember', s.projTab))}>VIEW EMBER</CutCornerButton>
            </div>
          </div>
          <div className="d-prof__col">
            <span className="section-header">FILE</span>
            <div>
              {p.facts.map(([k, v]) => <SettingsRow key={k} label={k} value={v} />)}
            </div>
          </div>
        </div>

        <div className="d-prof__col">
          <span className="section-header">HOBBIES &amp; INTERESTS</span>
          <Hobbies />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- résumé */

export function DResume(_: DCtx) {
  const r = RESUME;
  return (
    <div className="d-screen">
      <div className="d-resume">
        <div className="d-resume__head">
          <div className="d-stack2">
            {r.label && <span className="d-h30">{r.label}</span>}
            {r.note && <span className="d-para">{r.note}</span>}
          </div>
          <div className="d-resume__btns">
            <CutCornerButton href={r.download}>DOWNLOAD PDF</CutCornerButton>
            <CutCornerButton href={r.view}>OPEN IN DRIVE</CutCornerButton>
          </div>
        </div>
        <div className="d-resume__viewer">
          <iframe title="Résumé" src={r.preview} allow="autoplay" />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- blogs */

export function DBlogs({ s, set, go }: DCtx) {
  const b = BLOGS[s.blogIdx] ?? BLOGS[0];
  const lightbox = useLightbox();
  const cover = blogCover(b);
  const related = b.project ? projectById(b.project) : undefined;
  return (
    <div className="d-screen">
      <div style={{ position: 'absolute', left: 80, top: 200 }}>
        <ListGroupHeader>Posts {BLOGS.length}</ListGroupHeader>
        <div style={{ marginTop: 10 }}>
          <SlideList
            width={240}
            sel={s.blogIdx}
            items={BLOGS.map((x) => ({ key: x.id, label: x.short, trailing: x.date.slice(0, 4) }))}
            onHover={(i) => { if (i !== s.blogIdx) set({ blogIdx: i }); }}
          />
        </div>
      </div>
      <Rule left={340} />
      <article className="d-blog" key={b.id}>
        <div className="d-blog__col">
          <button type="button" className="btn-reset blog-cover" onClick={() => lightbox.open(b.title, blogSlides(b), 0, b.site)}>
            {cover ? <img src={cover} alt="" /> : <span className="blog-cover__ph">cover image</span>}
            <span className="ss__open-tag">⤢ VIEW</span>
          </button>
          <div className="d-stack2">
            <span className="section-header">IN THIS POST</span>
            <ol className="blog-toc">
              {b.sections.map((t) => <li key={t}>{t}</li>)}
            </ol>
          </div>
        </div>
        <div className="d-blog__col d-blog__info">
          <span className="blog-meta">{b.site.toUpperCase()} · {blogDate(b.date)} · {b.sections.length} SECTIONS</span>
          <a className="d-blog__title" href={b.href} target="_blank" rel="noopener noreferrer">{b.title}</a>
          {b.quote && <blockquote className="blog-quote">{b.quote}</blockquote>}
          <p className="d-para">{b.summary}</p>
          <div className="d-brief__btns">
            <CutCornerButton href={b.href}>READ ON {b.site.toUpperCase()}</CutCornerButton>
            {related && (
              <CutCornerButton onClick={() => go(openProjectPatch(related.id, s.projTab))}>VIEW {related.short.toUpperCase()}</CutCornerButton>
            )}
          </div>
          {b.images && b.images.length > 0 && (
            <div className="d-stack2 d-blog__figs">
              <span className="section-header">FIGURES</span>
              <Gallery title={b.title} slides={b.images} className="gallery blog-figs" />
            </div>
          )}
        </div>
        {lightbox.element}
      </article>
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
    </div>
  );
}
