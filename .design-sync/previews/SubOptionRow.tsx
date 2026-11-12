import { SubOptionRow } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const ProjectTabs = () => (
  <Stage>
    <SubOptionRow label="Project type" options={['Featured | 3', 'Personal | 2', 'Academic | 1', 'Hackathons | 4']} selected={0} />
  </Stage>
);

export const WithHover = () => (
  <Stage>
    <SubOptionRow label="Experience type" options={['Professional', 'Leadership']} selected={1} hoverIndex={0} />
  </Stage>
);
