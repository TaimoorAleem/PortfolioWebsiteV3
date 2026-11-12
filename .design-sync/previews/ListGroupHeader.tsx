import { ListBar, ListGroupHeader } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const ProjectGroup = () => (
  <Stage column width={240}>
    <ListGroupHeader>Hackathons</ListGroupHeader>
    <ListBar label="Rocky" selected />
    <ListBar label="Prismarine" />
    <ListBar label="Voxel" />
  </Stage>
);

export const Alone = () => (
  <Stage column width={240}>
    <ListGroupHeader>Posts 2</ListGroupHeader>
  </Stage>
);
