import { useCallback, useEffect, useRef, useState } from 'react';
import { LoadingScreen, MobilePromptBar, PlayerTag } from '../components';
import { mobileGlows } from '../theme/glowLayout';
import { INITIAL, PARENT, fromHash, toHash, type AppState, type ScreenId } from './state';
import {
  AboutScreen, BriefingScreen, ContactScreen, ExperienceScreen, HomeScreen, MENU, ProjectsScreen, SkillsScreen,
  activateMenu, type Ctx,
} from './screens';

type Phase = 'in' | 'out' | 'pre';
type Scene = 'home' | 'haze' | 'dark' | 'comms';

const sceneFor = (s: AppState): Scene => {
  switch (s.screen) {
    case 'home': return 'home';
    case 'projects': return 'haze';
    case 'about': return s.aboutTab === 0 ? 'dark' : 'haze';
    case 'skills':
    case 'contact': return 'comms';
    default: return 'dark';
  }
};

const SCREENS: Record<ScreenId, (ctx: Ctx) => JSX.Element> = {
  home: HomeScreen, projects: ProjectsScreen, briefing: BriefingScreen, experience: ExperienceScreen,
  about: AboutScreen, skills: SkillsScreen, contact: ContactScreen,
};

const reducedMotion = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

interface MobileAppProps {
  /** Sync screens with the location hash and handle keyboard input. Off for embedded previews. */
  routing?: boolean;
  /** Show the once-per-session boot screen. */
  boot?: boolean;
  initial?: Partial<AppState>;
}

export function MobileApp({ routing = true, boot = routing, initial }: MobileAppProps) {
  const [s, setS] = useState<AppState>(() => {
    const base = { ...INITIAL, ...initial };
    return routing ? { ...base, ...fromHash(window.location.hash, base) } : base;
  });
  const [phase, setPhase] = useState<Phase>('in');
  const [loading, setLoading] = useState(() => {
    if (!boot || reducedMotion()) return false;
    try {
      if (sessionStorage.getItem('ta_booted') === '1') return false;
      sessionStorage.setItem('ta_booted', '1');
    } catch { /* storage blocked: still show it once */ }
    return true;
  });

  const stateRef = useRef(s);
  stateRef.current = s;
  const timer = useRef<number>();

  useEffect(() => {
    if (!loading) return;
    const t = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(t);
  }, [loading]);

  const set = useCallback((patch: Partial<AppState>) => setS((v) => ({ ...v, ...patch })), []);

  const go = useCallback((patch: Partial<AppState>) => {
    const next = { ...stateRef.current, ...patch };
    if (routing) {
      const hash = toHash(next);
      if (hash !== window.location.hash) window.history.pushState(null, '', hash);
    }
    if (next.screen === stateRef.current.screen && next.projId === stateRef.current.projId) {
      setS(next);
      return;
    }
    if (reducedMotion()) { setS(next); return; }
    window.clearTimeout(timer.current);
    setPhase('out');
    timer.current = window.setTimeout(() => {
      setS((v) => ({ ...v, ...patch }));
      setPhase('pre');
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase('in')));
    }, 120);
  }, [routing]);

  const back = useCallback(() => {
    const cur = stateRef.current.screen;
    if (cur !== 'home') go({ screen: PARENT[cur] });
  }, [go]);

  // Browser back/forward and in-page anchors.
  useEffect(() => {
    if (!routing) return;
    const sync = () => {
      if (window.location.hash.startsWith('#/components')) return;
      setS((v) => ({ ...v, ...fromHash(window.location.hash, v) }));
      setPhase('in');
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => { window.removeEventListener('popstate', sync); window.removeEventListener('hashchange', sync); };
  }, [routing]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const ctx: Ctx = { s, set, go };
  const ctxRef = useRef(ctx);
  ctxRef.current = ctx;

  // Keyboard: Esc goes back everywhere; arrows + Enter drive the home menu like the desktop build.
  useEffect(() => {
    if (!routing) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      const typing = tag === 'input' || tag === 'textarea';
      if (e.key === 'Escape') {
        if (typing) { (e.target as HTMLElement).blur(); return; }
        back();
        return;
      }
      const c = ctxRef.current;
      if (c.s.screen !== 'home' || typing) return;
      const n = MENU.length;
      const m = MENU[c.s.menuIdx];
      const subs = 'subs' in m ? m.subs.length : 0;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        c.set({ menuIdx: (c.s.menuIdx + (e.key === 'ArrowDown' ? 1 : -1) + n) % n, subIdx: 0 });
      } else if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && subs) {
        e.preventDefault();
        c.set({ subIdx: (c.s.subIdx + (e.key === 'ArrowRight' ? 1 : -1) + subs) % subs });
      } else if (e.key === 'Enter' && (e.target === document.body || !(e.target instanceof HTMLButtonElement))) {
        e.preventDefault();
        activateMenu(c, c.s.menuIdx, c.s.subIdx);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [routing, back]);

  const scene = sceneFor(s);
  const Screen = SCREENS[s.screen];

  return (
    <div className="m-app" style={mobileGlows(s.screen)}>
      {(['home', 'haze', 'dark', 'comms'] as const).map((k) => (
        <div key={k} className={`scene scene--${k}`} style={{ opacity: scene === k ? 1 : 0 }} aria-hidden />
      ))}
      <div className="m-player"><PlayerTag /></div>
      <div className="m-screen">
        <main className="m-stage" data-phase={phase} key={s.screen}>
          <Screen {...ctx} />
        </main>
        <MobilePromptBar onBack={s.screen === 'home' ? undefined : back} />
      </div>
      {loading && <LoadingScreen onSkip={() => setLoading(false)} />}
    </div>
  );
}
