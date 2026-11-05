import { PROJECTS, RESUMES, tabFor, tabIds } from '../data';

export type ScreenId =
  | 'home' | 'profile' | 'experience' | 'projects' | 'skills' | 'about' | 'contact' | 'resume';

export interface AppState {
  screen: ScreenId;
  menuIdx: number;
  subIdx: number;
  /** Projects tab, index into PROJECT_TABS. */
  projTab: number;
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
  screen: 'home', menuIdx: 0, subIdx: 0, projTab: 0, projId: 'ember',
  expTab: 0, expIdx: 0, leadIdx: 0, awardIdx: -1, skillIdx: 0, skillVal: 0, contactIdx: 0, resumeIdx: 0,
};

export const EXP_TABS = ['Professional', 'Leadership'];

/** State patch that opens a project, keeping the current tab when it has it. */
export const openProject = (id: string, currentTab = 0): Partial<AppState> =>
  ({ screen: 'projects', projTab: tabFor(id, currentTab), projId: id });

/** Selected project in the current tab (falls back to the tab's first). */
export function currentProjectId(s: Pick<AppState, 'projTab' | 'projId'>): string | undefined {
  const ids = tabIds(s.projTab);
  return ids.includes(s.projId) ? s.projId : ids[0];
}

/** Same URL scheme as the desktop build. */
export function toHash(s: AppState): string {
  switch (s.screen) {
    case 'home': return '#/';
    case 'projects': {
      const id = currentProjectId(s);
      return id ? `#/projects/${id}` : '#/projects';
    }
    case 'experience': return s.expTab === 1 ? '#/experience/leadership' : '#/experience';
    case 'resume': return s.resumeIdx > 0 && RESUMES[s.resumeIdx] ? `#/resume/${RESUMES[s.resumeIdx].id}` : '#/resume';
    default: return `#/${s.screen}`;
  }
}

/** Translate a location hash into a state patch, keeping tab context where it still fits. */
export function fromHash(hash: string, cur: AppState): Partial<AppState> {
  const [a = '', b = ''] = hash.replace(/^#\/?/, '').split('/');
  switch (a) {
    case 'projects':
    case 'archive':
      return b && PROJECTS.some((p) => p.id === b) ? openProject(b, cur.projTab) : { screen: 'projects' };
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
  home: 'home', profile: 'home', experience: 'home', projects: 'home',
  skills: 'home', about: 'home', contact: 'home', resume: 'home',
};
