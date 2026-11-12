import { ListBar, TrophyCount } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Counts = () => (
  <Stage>
    <TrophyCount n={1} /><TrophyCount n={2} /><TrophyCount n={3} />
  </Stage>
);

export const InListCell = () => (
  <Stage column width={240}>
    <ListBar label="Ember" featured selected trailing={<TrophyCount n={3} />} />
    <ListBar label="Rocky" trailing={<TrophyCount n={2} />} />
  </Stage>
);
