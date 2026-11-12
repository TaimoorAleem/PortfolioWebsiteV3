import { Level } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Sizes = () => (
  <Stage>
    <Level value={26} size="sm" />
    <Level value={26} size="lg" />
  </Stage>
);

export const WithSuffix = () => (
  <Stage>
    <Level value={4} suffix="th year" />
  </Stage>
);
