import { ListBar, ListGroupHeader, TrophyCount } from 'portfolio-ui';

const Stage = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: 'column', gap: 10, width: 260 }}>{children}</div>
);

export const ProjectList = () => (
  <Stage>
    <ListGroupHeader>Featured</ListGroupHeader>
    <ListBar label="Ember" featured selected trailing={<TrophyCount n={3} />} />
    <ListBar label="Proprio" featured isNew />
    <ListBar label="AI Cricket Coach" featured trailing={<TrophyCount n={1} />} />
  </Stage>
);

export const States = () => (
  <Stage>
    <ListBar label="Default" />
    <ListBar label="Hover" state="hover" />
    <ListBar label="Selected" selected />
    <ListBar label="Disabled" disabled />
  </Stage>
);

export const WithTrailing = () => (
  <Stage>
    <ListBar label="Capstone Journey" trailing="2025" selected />
    <ListBar label="Datathon Recap" trailing="2025" />
  </Stage>
);
