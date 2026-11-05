import { RESUMES, allIds, catIds } from '../data';

export type ScreenId =
  | 'home' | 'profile' | 'experience' | 'projects' | 'briefing' | 'skills' | 'about' | 'contact' | 'resume';
export type ListKey = 'featured' | 'hackathons' | 'all';

export interface AppState {
  screen: ScreenId;
  menuIdx: number;
  subIdx: number;
  listKey: ListKey;
  catIdx: number;
  projId: string;
  /** Experience tab: 0 professional, 1 leadership. */
  expTab: number;
  expIdx: number;
  leadIdx: number;
  /** Expanded award row on About, -1 for none. */
  awardIdx: number;
  skillIdx: number;
  skillVal: number;
  contactIdx: number;
  resumeIdx: number;
}

export const INITIAL: AppState = {
  screen: 'home', menuIdx: 0, subIdx: 0, listKey: 'featured', catIdx: 0, projId: 'ember',
  expTab: 0, expIdx: 0, leadIdx: 0, awardIdx: -1, skillIdx: 0, skillVal: 0, contactIdx: 0, resumeIdx: 0,
};

/** Project ids for the active list. "Featured" mirrors the desktop design and lists everything. */
export function listIds(s: Pick<AppState, 'listKey' | 'catIdx'>): string[] {
  if (s.listKey === 'hackathons') return catIds(2);
  if (s.listKey === 'all') return catIds(s.catIdx);
  return allIds();
}

export const EXP_TABS = ['Professional', 'Leadership'];

/** Same URL scheme as the desktop build. */
export function toHash(s: AppState): string {
  switch (s.screen) {
    case 'home': return '#/';
    case 'briefing': return `#/projects/${s.projId}`;
    case 'experience': return s.expTab === 1 ? '#/experience/leadership' : '#/experience';
    case 'resume': return s.resumeIdx > 0 && RESUMES[s.resumeIdx] ? `#/resume/${RESUMES[s.resumeIdx].id}` : '#/resume';
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
    case 'archive': return { screen: 'projects', listKey: 'all' };
    case 'experience': return { screen: 'experience', expTab: b === 'leadership' ? 1 : 0 };
    // Older links: #/about/networks moved to Experience › Leadership.
    case 'about': return b === 'networks' ? { screen: 'experience', expTab: 1 } : { screen: 'about' };
    case 'resume': return { screen: 'resume', resumeIdx: Math.max(0, RESUMES.findIndex((r) => r.id === b)) };
    case 'profile':
    case 'skills':
    case 'contact':
      return { screen: a };
    default:
      return { screen: 'home' };
  }
}

export const PARENT: Record<ScreenId, ScreenId> = {
  home: 'home', profile: 'home', experience: 'home', projects: 'home', briefing: 'projects',
  skills: 'home', about: 'home', contact: 'home', resume: 'home',
};
