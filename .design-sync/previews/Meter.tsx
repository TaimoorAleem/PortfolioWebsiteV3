import { Meter } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

const Tile = ({ value, label, lit, of }: { value: string; label: string; lit: number; of?: number }) => (
  <div style={{ position: 'relative', width: 150, padding: '12px 14px 18px', background: 'var(--c-stat)', display: 'flex', flexDirection: 'column' }}>
    <span style={{ fontSize: 30, fontWeight: 700, lineHeight: '34px' }}>{value}</span>
    <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
    <Meter lit={lit} of={of} />
  </div>
);

export const StatTiles = () => (
  <Stage>
    <Tile value="9" label="Awards" lit={9} />
    <Tile value="21" label="Events Organized" lit={8} />
    <Tile value="22" label="Sponsors closed" lit={4} />
  </Stage>
);

export const FiveSegments = () => (
  <Stage>
    <Tile value="3/5" label="Shipped" lit={3} of={5} />
  </Stage>
);
