import { CATS, PROJECTS, RESUMES, SKILLS, allIds, catIds } from '../data';

export type DScreen =
  | 'home' | 'profile' | 'experience' | 'leadership' | 'projects' | 'archive' | 'briefing'
  | 'skills' | 'awards' | 'contact' | 'resume';

export interface DState {
  screen: DScreen;
  menuIdx: number;
  subIdx: number;
  /** Project ids for projects/briefing; null means all. */
  list: string[] | null;
  listName: string;
  projIdx: number;
  from: 'projects' | 'archive';
  catIdx: number;
  expIdx: number;
  leadIdx: number;
  awardIdx: number;
  skillIdx: number;
  skillVal: number;
  contactIdx: number;
  resumeIdx: number;
}

export const D_INITIAL: DState = {
  screen: 'home', menuIdx: 0, subIdx: 0, list: null, listName: 'Featured', projIdx: 0, from: 'projects',
  catIdx: 0, expIdx: 0, leadIdx: 0, awardIdx: -1, skillIdx: 0, skillVal: 0, contactIdx: 0, resumeIdx: 0,
};

export const curList = (s: DState) => s.list ?? allIds();

export const titleCase = (t: string) => t.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

export const EXP_TABS = ['Professional', 'Leadership'];

export const D_MENU = [
  { id: 'profile', label: 'PROFILE' },
  { id: 'experience', label: 'EXPERIENCE', subs: EXP_TABS },
  { id: 'projects', label: 'PROJECTS', subs: ['Featured', 'Hackathons', 'All Projects'], isNew: true },
  { id: 'skills', label: 'SKILLS' },
  { id: 'about', label: 'ABOUT' },
  { id: 'contact', label: 'CONTACT' },
  { id: 'resume', label: 'RÉSUMÉ', special: true },
] as const satisfies readonly { id: string; label: string; subs?: readonly string[]; isNew?: boolean; special?: boolean }[];

export const skillRows = () => SKILLS.flatMap(([group, rows]) => rows.map(([name, vals]) => ({ group, name, vals })));

/** Same URL scheme as the mobile site so links work at any width. */
export function dToHash(s: DState): string {
  switch (s.screen) {
    case 'home': return '#/';
    case 'briefing': return `#/projects/${curList(s)[s.projIdx] ?? ''}`;
    case 'leadership': return '#/experience/leadership';
    case 'awards': return '#/about';
    case 'resume': return s.resumeIdx > 0 && RESUMES[s.resumeIdx] ? `#/resume/${RESUMES[s.resumeIdx].id}` : '#/resume';
    default: return `#/${s.screen}`;
  }
}

export function dFromHash(hash: string, cur: DState): Partial<DState> {
  const [a = '', b = ''] = hash.replace(/^#\/?/, '').split('/');
  switch (a) {
    case 'projects': {
      if (!b || !PROJECTS.some((p) => p.id === b)) return { screen: 'projects' };
      const list = curList(cur);
      if (list.includes(b)) return { screen: 'briefing', projIdx: list.indexOf(b) };
      return { screen: 'briefing', list: allIds(), listName: 'Featured', projIdx: allIds().indexOf(b), from: 'projects' };
    }
    case 'archive': return { screen: 'archive' };
    case 'experience': return { screen: b === 'leadership' ? 'leadership' : 'experience' };
    // Older links: #/about/networks moved to Experience › Leadership, #/about/awards is now #/about.
    case 'about': return b === 'networks' ? { screen: 'leadership' } : { screen: 'awards' };
    case 'resume': return { screen: 'resume', resumeIdx: Math.max(0, RESUMES.findIndex((r) => r.id === b)) };
    case 'profile':
    case 'skills':
    case 'contact':
      return { screen: a };
    default:
      return { screen: 'home' };
  }
}

export const D_TITLES: Partial<Record<DScreen, string>> = {
  profile: 'PROFILE', experience: 'SERVICE RECORD', leadership: 'SERVICE RECORD', projects: 'PROJECTS',
  archive: 'ALL PROJECTS', briefing: 'PROJECT BRIEFING', skills: 'LOADOUT CONFIG', awards: 'AWARDS',
  contact: 'COMMS', resume: 'RÉSUMÉ',
};

export const D_SCENE: Record<DScreen, 'A' | 'B' | 'C'> = {
  home: 'A', projects: 'A', archive: 'A', awards: 'A',
  skills: 'B', contact: 'B',
  profile: 'C', experience: 'C', leadership: 'C', briefing: 'C', resume: 'C',
};

export { CATS, catIds };
