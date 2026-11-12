import { PlayerBlock } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Default = () => (
  <Stage>
    <PlayerBlock name="TAIMOOR" initials="TA" status="Toronto, ON" />
  </Stage>
);

export const WithLevelAndXp = () => (
  <Stage>
    <PlayerBlock name="TAIMOOR" initials="TA" status="Open to new grad roles" level={26} xp={7} levelSuffix="CS" />
  </Stage>
);
