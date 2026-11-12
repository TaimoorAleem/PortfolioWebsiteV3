import { LoadingScreen } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const BootScreen = () => (
  <div style={{ position: 'relative', width: 420, height: 320, overflow: 'hidden' }}>
    <LoadingScreen onSkip={() => {}} />
  </div>
);
