import { BLOGS, PROJECTS, PROJECT_TABS, SKILLS, tabFor, tabIds } from '../data';

export type DScreen =
  | 'home' | 'profile' | 'experience' | 'leadership' | 'projects'
  | 'skills' | 'awards' | 'blogs' | 'contact' | 'resume';

export interface DState {
  screen: DScreen;
  menuIdx: number;
  subIdx: number;
  /** Projects tab, index into PROJECT_TABS. */
  projTab: number;
  /** Selected project within the tab. */
  projIdx: number;
  /** Slideshow position for the selected project. */
  slideIdx: number;
  expIdx: number;
  leadIdx: number;
  awardIdx: number;
  skillIdx: number;
  skillVal: number;
  contactIdx: number;
  blogIdx: number;
}

export const D_INITIAL: DState = {
  screen: 'home', menuIdx: 0, subIdx: 0, projTab: 0, projIdx: 0, slideIdx: 0,
  expIdx: 0, leadIdx: 0, awardIdx: -1, skillIdx: 0, skillVal: 0, contactIdx: 0, blogIdx: 0,
};

export const titleCase = (t: string) => t.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

export const EXP_TABS = ['Professional', 'Leadership'];

export const D_MENU = [
  { id: 'profile', label: 'PROFILE' },
  { id: 'experience', label: 'EXPERIENCE', subs: EXP_TABS },
  { id: 'projects', label: 'PROJECTS', subs: PROJECT_TABS.map((t) => t.label), isNew: true },
  { id: 'skills', label: 'SKILLS' },
  { id: 'about', label: 'AWARDS' },
  { id: 'blogs', label: 'BLOGS' },
  { id: 'contact', label: 'CONTACT' },
  { id: 'resume', label: 'RÉSUMÉ', special: true },
] as const satisfies readonly { id: string; label: string; subs?: readonly string[]; isNew?: boolean; special?: boolean }[];

export const skillRows = () => SKILLS.flatMap(([group, rows]) => rows.map(([name, vals]) => ({ group, name, vals })));

/** State patch that opens a project on the Projects page, keeping the current tab when it has it. */
export function openProjectPatch(id: string, currentTab = 0): Partial<DState> {
  const projTab = tabFor(id, currentTab);
  return { screen: 'projects', projTab, projIdx: Math.max(0, tabIds(projTab).indexOf(id)), slideIdx: 0 };
}

/** Same URL scheme as the mobile site so links work at any width. */
export function dToHash(s: DState): string {
  switch (s.screen) {
    case 'home': return '#/';
    case 'projects': {
      const id = tabIds(s.projTab)[s.projIdx];
      return id ? `#/projects/${id}` : '#/projects';
    }
    case 'leadership': return '#/experience/leadership';
    case 'awards': return '#/awards';
    case 'blogs': return s.blogIdx > 0 && BLOGS[s.blogIdx] ? `#/blogs/${BLOGS[s.blogIdx].id}` : '#/blogs';
    default: return `#/${s.screen}`;
  }
}

export function dFromHash(hash: string, cur: DState): Partial<DState> {
  const [a = '', b = ''] = hash.replace(/^#\/?/, '').split('/');
  switch (a) {
    case 'projects':
    case 'archive':
      return b && PROJECTS.some((p) => p.id === b) ? openProjectPatch(b, cur.projTab) : { screen: 'projects' };
    case 'experience': return { screen: b === 'leadership' ? 'leadership' : 'experience' };
    case 'awards': return { screen: 'awards' };
    case 'blogs':
    case 'blog': return { screen: 'blogs', blogIdx: Math.max(0, BLOGS.findIndex((x) => x.id === b)) };
    // Older links: #/about/networks moved to Experience › Leadership; #/about was the awards page.
    case 'about': return b === 'networks' ? { screen: 'leadership' } : { screen: 'awards' };
    case 'resume': return { screen: 'resume' };
    case 'profile':
    case 'skills':
    case 'contact':
      return { screen: a };
    default:
      return { screen: 'home' };
  }
}

export const D_TITLES: Partial<Record<DScreen, string>> = {
  profile: 'PROFILE', experience: 'CAMPAIGN', leadership: 'MULTIPLAYER', projects: 'PROJECTS',
  skills: 'LOADOUT CONFIG', awards: 'AWARDS', blogs: 'DEV LOGS', contact: 'COMMS', resume: 'RÉSUMÉ',
};

export const D_SCENE: Record<DScreen, 'A' | 'B' | 'C'> = {
  home: 'A', awards: 'A',
  skills: 'B', contact: 'B',
  profile: 'C', experience: 'C', leadership: 'C', projects: 'C', resume: 'C', blogs: 'C',
};
