import { useCallback, useEffect, useRef, useState } from 'react';
import { LoadingBar, PlayerBlock, PromptBar, type Prompt } from '../components';
import { desktopGlows } from '../theme/glowLayout';
import { CATS, EMAIL, EXPERIENCE, LINKS, NETWORKS, ABOUT, AWARDS, RESUME_HREF, allIds, catIds } from '../data';
import {
  DAbout, DArchive, DAwards, DBriefing, DContact, DExperience, DHome, DNetworks, DProjects, DSkills, FIELDS,
  type DCtx, type FormKey,
} from './screens';
import {
  D_INITIAL, D_MENU, D_SCENE, D_TITLES, curList, dFromHash, dToHash, skillRows, titleCase, type DScreen, type DState,
} from './state';

type Phase = 'in' | 'out' | 'pre';

const SCREENS: Record<DScreen, (c: DCtx) => JSX.Element> = {
  home: DHome, projects: DProjects, archive: DArchive, briefing: DBriefing, experience: DExperience,
  awards: DAwards, networks: DNetworks, skills: DSkills, about: DAbout, contact: DContact,
};

const reducedMotion = () => !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const EMPTY_FORM: Record<FormKey, string> = { name: '', email: '', message: '' };

const fitScale = () => Math.min(window.innerWidth / 1440, window.innerHeight / 900);

export function DesktopApp({ grain = true, bootScreen = true }: { grain?: boolean; bootScreen?: boolean }) {
  const [s, setS] = useState<DState>(() => ({ ...D_INITIAL, ...dFromHash(window.location.hash, D_INITIAL) }));
  const [phase, setPhase] = useState<Phase>('in');
  const [scale, setScale] = useState(fitScale);
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
    const fit = () => setScale(fitScale());
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
    const cur = ref.current;
    if (cur.screen === 'home') return;
    go({ screen: cur.screen === 'briefing' ? cur.from : 'home' });
  }, [go]);

  const activate = useCallback((mi: number, si: number) => {
    const m = D_MENU[mi];
    set({ menuIdx: mi, subIdx: si });
    switch (m.id) {
      case 'projects':
        if (si === 0) go({ screen: 'projects', list: allIds(), listName: 'Featured', projIdx: 0, from: 'projects' });
        else if (si === 1) go({ screen: 'projects', list: catIds(2), listName: 'Hackathons', projIdx: 0, from: 'projects' });
        else go({ screen: 'archive', catIdx: 0 });
        break;
      case 'about': go({ screen: (['about', 'awards', 'networks'] as const)[si] ?? 'about' }); break;
      case 'resume': window.open(RESUME_HREF, '_blank', 'noopener'); break;
      default: go({ screen: m.id });
    }
  }, [go, set]);

  const openLink = useCallback((i: number) => {
    const l = LINKS[i];
    if (l.href.startsWith('mailto')) window.location.href = l.href;
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
        case 'projects':
          if (dir) L.set({ projIdx: wrap(st.projIdx + dir, curList(st).length) });
          if (enter) L.go({ screen: 'briefing', from: 'projects' });
          break;
        case 'briefing':
          if (dir) L.set({ projIdx: wrap(st.projIdx + dir, curList(st).length) });
          break;
        case 'archive':
          if (dir) L.set({ catIdx: wrap(st.catIdx + dir, CATS.length) });
          if (enter) L.go({ screen: 'briefing', list: catIds(st.catIdx), listName: titleCase(CATS[st.catIdx]), projIdx: 0, from: 'archive' });
          break;
        case 'experience': if (dir) L.set({ expIdx: wrap(st.expIdx + dir, EXPERIENCE.length) }); break;
        case 'awards': if (dir) L.set({ awardIdx: wrap(st.awardIdx + dir, AWARDS.length) }); break;
        case 'networks': if (dir) L.set({ netIdx: wrap(st.netIdx + dir, NETWORKS.length) }); break;
        case 'about': if (dir) L.set({ aboutIdx: wrap(st.aboutIdx + dir, ABOUT.length) }); break;
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
    projects: [{ k: '↵', label: 'Open', onClick: () => go({ screen: 'briefing', from: 'projects' }) }, esc, { k: '↑↓', label: 'Browse' }],
    archive: [{ k: '↵', label: 'Open' }, esc, { k: '↑↓', label: 'Category' }],
    briefing: [{ k: '↑↓', label: 'Switch project' }, esc],
    experience: [{ k: '↑↓', label: 'Chapter' }, esc],
    awards: [{ k: '↑↓', label: 'Browse' }, esc],
    networks: [{ k: '↑↓', label: 'Browse' }, esc],
    skills: [{ k: '↵', label: 'Select' }, esc, { k: '←→', label: 'Switch project' }],
    about: [{ k: '↑↓', label: 'Section' }, esc],
    contact: [{ k: '↵', label: 'Select' }, esc, { k: '↑↓', label: 'Navigate' }],
  };

  const scene = D_SCENE[s.screen];
  const title = D_TITLES[s.screen];
  const Screen = SCREENS[s.screen];
  const ctx: DCtx = { s, set, go, activate, openLink, send, form, setField: (k, v) => setForm((f) => ({ ...f, [k]: v })) };

  return (
    <div className="d-root">
      <div className="d-stage" style={{ transform: `scale(${scale})`, ...desktopGlows(s.screen) }} data-phase={phase}>
        <div className="d-scene d-scene--a" style={{ opacity: scene === 'A' ? 1 : 0 }} />
        <div className="d-scene d-scene--b" style={{ opacity: scene === 'B' ? 1 : 0 }} />
        <div className="d-scene d-scene--c" style={{ opacity: scene === 'C' ? 1 : 0 }} />
        <div className="d-vignette" />
        {grain && <div className="d-grain" />}

        {title && (
          <>
            <h1 className="d-title">{title}</h1>
            <div className="d-title-hair" />
          </>
        )}

        <div className="d-player"><PlayerBlock levelSuffix="Awards" /></div>

        <main className="d-content" key={s.screen}>
          <Screen {...ctx} />
        </main>

        <div className="d-prompts"><PromptBar prompts={prompts[s.screen]} /></div>

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
            <div className="d-boot__title">BOOTING PROFILE</div>
            <div className="d-boot__hair" />
            <div className="d-boot__bar"><LoadingBar /></div>
            <div className="d-boot__tip"><span>TIP:</span> Use the arrow keys and Enter to navigate, just like the menus.</div>
          </div>
        )}
      </div>
    </div>
  );
}
