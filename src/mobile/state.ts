import { allIds, catIds } from '../data';

export type ScreenId = 'home' | 'projects' | 'briefing' | 'experience' | 'about' | 'skills' | 'contact';
export type ListKey = 'featured' | 'hackathons' | 'all';

export interface AppState {
  screen: ScreenId;
  menuIdx: number;
  subIdx: number;
  listKey: ListKey;
  catIdx: number;
  projId: string;
  expIdx: number;
  aboutTab: number;
  skillIdx: number;
  skillVal: number;
  contactIdx: number;
}

export const INITIAL: AppState = {
  screen: 'home', menuIdx: 0, subIdx: 0, listKey: 'featured', catIdx: 0, projId: 'ember',
  expIdx: 0, aboutTab: 0, skillIdx: 0, skillVal: 0, contactIdx: 0,
};

/** Project ids for the active list. "Featured" mirrors the desktop design and lists everything. */
export function listIds(s: Pick<AppState, 'listKey' | 'catIdx'>): string[] {
  if (s.listKey === 'hackathons') return catIds(2);
  if (s.listKey === 'all') return catIds(s.catIdx);
  return allIds();
}

export const ABOUT_TABS = ['Profile', 'Awards', 'Networks'];
const ABOUT_SLUGS = ['', 'awards', 'networks'];

export function toHash(s: AppState): string {
  switch (s.screen) {
    case 'home': return '#/';
    case 'briefing': return `#/projects/${s.projId}`;
    case 'about': return ABOUT_SLUGS[s.aboutTab] ? `#/about/${ABOUT_SLUGS[s.aboutTab]}` : '#/about';
    default: return `#/${s.screen}`;
  }
}

/** Translate a location hash into a state patch, keeping list context where it still fits. */
export function fromHash(hash: string, cur: AppState): Partial<AppState> {
  const [a = '', b = ''] = hash.replace(/^#\/?/, '').split('/');
  switch (a) {
    case 'projects': {
      if (!b) return { screen: 'projects' };
      if (!allIds().includes(b)) return { screen: 'projects' };
      return listIds(cur).includes(b) ? { screen: 'briefing', projId: b } : { screen: 'briefing', projId: b, listKey: 'featured' };
    }
    case 'about': return { screen: 'about', aboutTab: Math.max(0, ABOUT_SLUGS.indexOf(b)) };
    case 'experience':
    case 'skills':
    case 'contact':
      return { screen: a };
    default:
      return { screen: 'home' };
  }
}

export const PARENT: Record<ScreenId, ScreenId> = {
  home: 'home', projects: 'home', briefing: 'projects', experience: 'home', about: 'home', skills: 'home', contact: 'home',
};
