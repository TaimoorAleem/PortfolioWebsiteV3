import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { LoadingBar, PlayerBlock, PromptBar, type Prompt } from '../components';
import { desktopGlows } from '../theme/glowLayout';
import { AWARDS, BLOGS, EMAIL, EXPERIENCE, LEADERSHIP, LINKS, projectById, projectSlides, tabIds } from '../data';
import {
  DAwards, DBlogs, DContact, DExperience, DHome, DLeadership, DProfile, DProjects, DResume, DSkills, FIELDS,
  type DCtx, type FormKey,
} from './screens';
import {
  D_INITIAL, D_MENU, D_SCENE, D_TITLES, dFromHash, dToHash, skillRows, type DScreen, type DState,
} from './state';

type Phase = 'in' | 'out' | 'pre';

const SCREENS: Record<DScreen, (c: DCtx) => JSX.Element> = {
  home: DHome, profile: DProfile, experience: DExperience, leadership: DLeadership, projects: DProjects,
  skills: DSkills, awards: DAwards, blogs: DBlogs, contact: DContact, resume: DResume,
};

const reducedMotion = () => !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const EMPTY_FORM: Record<FormKey, string> = { name: '', email: '', message: '' };

/** The design is a 1440 × 900 layout. It's scaled so it fits the window, and the stage
 *  around it is stretched to fill the rest so backgrounds reach every edge. */
const DESIGN_W = 1440;
const DESIGN_H = 900;
const viewport = () => ({ w: window.innerWidth, h: window.innerHeight });

export function DesktopApp({ grain = true, bootScreen = true }: { grain?: boolean; bootScreen?: boolean }) {
  const [s, setS] = useState<DState>(() => ({ ...D_INITIAL, ...dFromHash(window.location.hash, D_INITIAL) }));
  const [phase, setPhase] = useState<Phase>('in');
  const [vp, setVp] = useState(viewport);
  const [form, setForm] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(() => {
    if (!bootScreen || reducedMotion()) return false;
    try {
      if (sessionStorage.getItem('ta_booted') === '1') return false;
      sessionStorage.setItem('ta_booted', '1');
    } catch { /* storage blocked */ }
    return true;
  });

  const ref = useRef(s);
  ref.current = s;
  const timer = useRef<number>();

  useEffect(() => {
    const fit = () => setVp(viewport());
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  useEffect(() => {
    if (!loading) return;
    const t = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(t);
  }, [loading]);

  const set = useCallback((patch: Partial<DState>) => setS((v) => ({ ...v, ...patch })), []);

  const go = useCallback((patch: Partial<DState>) => {
    const next = { ...ref.current, ...patch };
    const hash = dToHash(next);
    if (hash !== window.location.hash) window.history.pushState(null, '', hash);
    if (next.screen === ref.current.screen) { setS(next); return; }
    if (reducedMotion()) { setS(next); return; }
    window.clearTimeout(timer.current);
    setPhase('out');
    timer.current = window.setTimeout(() => {
      setS((v) => ({ ...v, ...patch }));
      setPhase('pre');
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase('in')));
    }, 120);
  }, []);

  const back = useCallback(() => {
    if (ref.current.screen !== 'home') go({ screen: 'home' });
  }, [go]);

  const activate = useCallback((mi: number, si: number) => {
    const m = D_MENU[mi];
    set({ menuIdx: mi, subIdx: si });
    switch (m.id) {
      case 'projects': go({ screen: 'projects', projTab: si, projIdx: 0, slideIdx: 0 }); break;
      case 'experience': go({ screen: si === 1 ? 'leadership' : 'experience' }); break;
      case 'about': go({ screen: 'awards', awardIdx: -1 }); break;
      case 'blogs': go({ screen: 'blogs', blogIdx: 0 }); break;
      default: go({ screen: m.id });
    }
  }, [go, set]);

  const openLink = useCallback((i: number) => {
    const l = LINKS[i];
    if (l.href.startsWith('mailto') || l.href.startsWith('#')) window.location.href = l.href;
    else window.open(l.href, '_blank', 'noopener');
  }, []);

  const formRef = useRef(form);
  formRef.current = form;
  const send = useCallback(() => {
    const f = formRef.current;
    if (!f.message.trim()) { set({ contactIdx: LINKS.length + 2 }); return; }
    const subject = `Portfolio message${f.name ? ` from ${f.name}` : ''}`;
    const body = `${f.message}\n\n${f.name}${f.email ? ` <${f.email}>` : ''}`.trim();
    // No backend: hand the message to the visitor's mail client.
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }, [set]);

  const closeSent = useCallback(() => {
    setSent(false);
    setForm(EMPTY_FORM);
    set({ contactIdx: 0 });
  }, [set]);

  // Browser back/forward.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash.startsWith('#/components')) return;
      setS((v) => ({ ...v, ...dFromHash(window.location.hash, v) }));
      setPhase('in');
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => { window.removeEventListener('popstate', sync); window.removeEventListener('hashchange', sync); };
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Keyboard navigation, ported from the design's onKey handler.
  const live = useRef({ loading, sent, send, closeSent, activate, openLink, back, go, set });
  live.current = { loading, sent, send, closeSent, activate, openLink, back, go, set };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const L = live.current;
      const st = ref.current;
      if (L.loading) { e.preventDefault(); setLoading(false); return; }
      const k = e.key;
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      const typing = tag === 'input' || tag === 'textarea';
      if (L.sent) { if (k === 'Enter' || k === 'Escape') { e.preventDefault(); L.closeSent(); } return; }
      if (k === 'Escape') { e.preventDefault(); if (typing) { (e.target as HTMLElement).blur(); return; } L.back(); return; }
      if (typing && (k === 'ArrowLeft' || k === 'ArrowRight')) return;
      const dir = k === 'ArrowDown' ? 1 : k === 'ArrowUp' ? -1 : 0;
      const h = k === 'ArrowRight' ? 1 : k === 'ArrowLeft' ? -1 : 0;
      const enter = k === 'Enter';
      if (!dir && !h && !enter) return;
      // Let a focused button/link handle its own Enter.
      if (enter && !typing && e.target instanceof HTMLElement && e.target.closest('button, a')) return;
      e.preventDefault();
      const wrap = (v: number, n: number) => (v + n) % n;
      switch (st.screen) {
        case 'home': {
          const n = D_MENU.length;
          if (dir) L.set({ menuIdx: wrap(st.menuIdx + dir, n), subIdx: 0 });
          const m = D_MENU[st.menuIdx];
          if (h && 'subs' in m) L.set({ subIdx: wrap(st.subIdx + h, m.subs.length) });
          if (enter) L.activate(st.menuIdx, st.subIdx);
          break;
        }
        case 'projects': {
          const ids = tabIds(st.projTab);
          if (!ids.length) break;
          if (dir) L.set({ projIdx: wrap(st.projIdx + dir, ids.length), slideIdx: 0 });
          if (h) {
            const p = projectById(ids[Math.min(st.projIdx, ids.length - 1)]);
            if (p) L.set({ slideIdx: wrap(st.slideIdx + h, projectSlides(p).length) });
          }
          break;
        }
        case 'experience':
          if (dir) L.set({ expIdx: wrap(st.expIdx + dir, EXPERIENCE.length) });
          if (h) L.go({ screen: 'leadership' });
          break;
        case 'leadership':
          if (dir) L.set({ leadIdx: wrap(st.leadIdx + dir, LEADERSHIP.length) });
          if (h) L.go({ screen: 'experience' });
          break;
        case 'awards': if (dir) L.set({ awardIdx: wrap(Math.max(st.awardIdx, dir > 0 ? -1 : 0) + dir, AWARDS.length) }); break;
        case 'blogs':
          if (dir) L.set({ blogIdx: wrap(st.blogIdx + dir, BLOGS.length) });
          if (enter) window.open(BLOGS[st.blogIdx].href, '_blank', 'noopener');
          break;
        case 'skills': {
          const rows = skillRows();
          if (dir) L.set({ skillIdx: wrap(st.skillIdx + dir, rows.length), skillVal: 0 });
          if (h) L.set({ skillVal: wrap(st.skillVal + h, rows[st.skillIdx].vals.length) });
          break;
        }
        case 'contact': {
          const n = LINKS.length + FIELDS.length + 1;
          if (dir) { if (typing) (e.target as HTMLElement).blur(); L.set({ contactIdx: wrap(st.contactIdx + dir, n) }); }
          if (enter) {
            const i = st.contactIdx;
            if (i < LINKS.length) L.openLink(i);
            else if (i < n - 1) { if (typing) (e.target as HTMLElement).blur(); L.set({ contactIdx: i + 1 }); }
            else L.send();
          }
          break;
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const esc: Prompt = { k: 'Esc', label: 'Back', onClick: back };
  const prompts: Record<DScreen, Prompt[]> = {
    home: [{ k: '↵', label: 'Select', onClick: () => activate(s.menuIdx, s.subIdx) }, { k: '↑↓', label: 'Navigate' }, { k: '←→', label: 'Options' }],
    projects: [{ k: '↑↓', label: 'Project' }, { k: '←→', label: 'Images' }, esc],
    profile: [esc],
    experience: [{ k: '↑↓', label: 'Chapter' }, { k: '←→', label: 'Leadership', onClick: () => go({ screen: 'leadership' }) }, esc],
    leadership: [{ k: '↑↓', label: 'Chapter' }, { k: '←→', label: 'Professional', onClick: () => go({ screen: 'experience' }) }, esc],
    awards: [{ k: '↑↓', label: 'Browse' }, esc],
    blogs: [{ k: '↵', label: 'Read', onClick: () => window.open(BLOGS[s.blogIdx].href, '_blank', 'noopener') }, ...(BLOGS.length > 1 ? [{ k: '↑↓', label: 'Post' }] : []), esc],
    skills: [{ k: '↵', label: 'Select' }, esc, { k: '←→', label: 'Switch project' }],
    contact: [{ k: '↵', label: 'Select' }, esc, { k: '↑↓', label: 'Navigate' }],
    resume: [esc],
  };

  const scene = D_SCENE[s.screen];
  const title = D_TITLES[s.screen];
  const Screen = SCREENS[s.screen];
  const ctx: DCtx = { s, set, go, activate, openLink, send, form, setField: (k, v) => setForm((f) => ({ ...f, [k]: v })) };

  // Fill the window: scale to fit, then grow the stage to cover the leftover space.
  const scale = Math.min(vp.w / DESIGN_W, vp.h / DESIGN_H);
  const stageW = vp.w / scale;
  const stageH = vp.h / scale;
  const gx = (stageW - DESIGN_W) / 2;
  const gy = (stageH - DESIGN_H) / 2;
  const stageStyle = {
    width: stageW, height: stageH, transform: `scale(${scale})`,
    '--gx': `${gx}px`, '--gy': `${gy}px`, ...desktopGlows(s.screen),
  } as CSSProperties;
  const frameStyle: CSSProperties = { left: gx, top: gy };

  return (
    <div className="d-root">
      <div className="d-stage" style={stageStyle} data-phase={phase}>
        <div className="d-scene d-scene--a" style={{ opacity: scene === 'A' ? 1 : 0 }} />
        <div className="d-scene d-scene--b" style={{ opacity: scene === 'B' ? 1 : 0 }} />
        <div className="d-scene d-scene--c" style={{ opacity: scene === 'C' ? 1 : 0 }} />
        <div className="d-vignette" />
        {grain && <div className="d-grain" />}

        <div className="d-frame" style={frameStyle}>
          {title && (
            <>
              <h1 className="d-title">{title}</h1>
              <div className="d-title-hair" />
            </>
          )}

          <div className="d-player"><PlayerBlock onClick={() => go({ screen: 'profile' })} /></div>

          <main className="d-content" key={s.screen}>
            <Screen {...ctx} />
          </main>

          <div className="d-prompts"><PromptBar prompts={prompts[s.screen]} /></div>
        </div>

        {sent && (
          <div className="d-sent" onClick={closeSent}>
            <div className="d-sent__band">
              <span className="d-sent__title">TRANSMISSION READY</span>
              <span className="d-sent__text">Your mail app should open with the message filled in. I'll reply within two days.</span>
              <PromptBar prompts={[{ k: '↵', label: 'Continue', onClick: closeSent }]} />
            </div>
          </div>
        )}

        {loading && (
          <div className="d-boot" onClick={() => setLoading(false)}>
            <div className="d-frame" style={frameStyle}>
              <div className="d-boot__title">BOOTING PROFILE</div>
              <div className="d-boot__hair" />
              <div className="d-boot__bar"><LoadingBar /></div>
              <div className="d-boot__tip"><span>TIP:</span> Use the arrow keys and Enter to navigate, just like the menus.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
