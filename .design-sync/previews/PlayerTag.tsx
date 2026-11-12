import { PlayerTag } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Default = () => (
  <Stage>
    <PlayerTag name="TAIMOOR" />
  </Stage>
);

export const WithLevel = () => (
  <Stage>
    <PlayerTag name="TAIMOOR" level={26} />
    <PlayerTag name="TAIMOOR" level={26} onClick={() => {}} />
  </Stage>
);
