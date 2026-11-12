import { MenuItem } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const MainMenu = () => (
  <Stage column width={340}>
    <MenuItem label="PROFILE" focused />
    <MenuItem label="EXPERIENCE" />
    <MenuItem label="PROJECTS" isNew />
    <MenuItem label="AWARDS" />
    <MenuItem label="RÉSUMÉ" special />
  </Stage>
);

export const Medium = () => (
  <Stage column width={300}>
    <MenuItem size="md" label="PROFILE" state="focused" />
    <MenuItem size="md" label="SKILLS" />
    <MenuItem size="md" label="LOCKED" disabled />
  </Stage>
);
