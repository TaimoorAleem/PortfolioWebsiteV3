import { MediaPlaceholder } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Dark = () => (
  <Stage width={360}>
    <div style={{ width: 312 }}><MediaPlaceholder label="Ember prototype photo" /></div>
  </Stage>
);

export const Warm = () => (
  <Stage width={360}>
    <div style={{ width: 312 }}><MediaPlaceholder label="BearHacks 2026 ceremony" tone="warm" /></div>
  </Stage>
);
