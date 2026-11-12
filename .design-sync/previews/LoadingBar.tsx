import { LoadingBar } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Progress = () => (
  <Stage column width={420}>
    <LoadingBar progress={0.25} />
    <LoadingBar progress={0.6} />
    <LoadingBar progress={1} />
  </Stage>
);

export const Animated = () => (
  <Stage column width={420}>
    <LoadingBar />
  </Stage>
);
