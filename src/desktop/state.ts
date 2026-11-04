import { CATS, PROJECTS, SKILLS, allIds, catIds } from '../data';

export type DScreen =
  | 'home' | 'projects' | 'archive' | 'briefing' | 'experience'
  | 'awards' | 'networks' | 'skills' | 'about' | 'contact';

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
  awardIdx: number;
  netIdx: number;
  skillIdx: number;
  skillVal: number;
  aboutIdx: number;
  contactIdx: number;
}

export const D_INITIAL: DState = {
  screen: 'home', menuIdx: 0, subIdx: 0, list: null, listName: 'Featured', projIdx: 0, from: 'projects',
  catIdx: 0, expIdx: 0, awardIdx: 0, netIdx: 0, skillIdx: 0, skillVal: 0, aboutIdx: 0, contactIdx: 0,
};

export const curList = (s: DState) => s.list ?? allIds();

export const titleCase = (t: string) => t.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

export const D_MENU = [
  { id: 'projects', label: 'PROJECTS', subs: ['Featured', 'Hackathons', 'All Projects'], isNew: true },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'about', label: 'ABOUT', subs: ['Profile', 'Awards', 'Networks'] },
  { id: 'skills', label: 'SKILLS' },
  { id: 'contact', label: 'CONTACT' },
  { id: 'resume', label: 'RÉSUMÉ', special: true },
] as const satisfies readonly { id: string; label: string; subs?: readonly string[]; isNew?: boolean; special?: boolean }[];

export const skillRows = () => SKILLS.flatMap(([group, rows]) => rows.map(([name, vals]) => ({ group, name, vals })));

/** Same URL scheme as the mobile site so links work at any width. */
export function dToHash(s: DState): string {
  switch (s.screen) {
    case 'home': return '#/';
    case 'briefing': return `#/projects/${curList(s)[s.projIdx] ?? ''}`;
    case 'awards': return '#/about/awards';
    case 'networks': return '#/about/networks';
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
    case 'about': return { screen: b === 'awards' ? 'awards' : b === 'networks' ? 'networks' : 'about' };
    case 'experience':
    case 'skills':
    case 'contact':
      return { screen: a };
    default:
      return { screen: 'home' };
  }
}

export const D_TITLES: Partial<Record<DScreen, string>> = {
  projects: 'PROJECTS', archive: 'ALL PROJECTS', briefing: 'PROJECT BRIEFING', experience: 'SERVICE RECORD',
  awards: 'AWARDS', networks: 'NETWORKS', skills: 'LOADOUT CONFIG', about: 'PROFILE', contact: 'COMMS',
};

export const D_SCENE: Record<DScreen, 'A' | 'B' | 'C'> = {
  home: 'A', projects: 'A', archive: 'A', awards: 'A', networks: 'A',
  skills: 'B', contact: 'B', briefing: 'C', experience: 'C', about: 'C',
};

export { CATS, catIds };
