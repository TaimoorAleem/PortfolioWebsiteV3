import { MobilePromptBar } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const WithBack = () => (
  <Stage column width={390}>
    <MobilePromptBar onBack={() => {}} />
  </Stage>
);

export const HomeFooter = () => (
  <Stage column width={390}>
    <MobilePromptBar />
  </Stage>
);
