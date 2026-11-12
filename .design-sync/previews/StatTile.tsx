import { StatTile } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Loadout = () => (
  <Stage column width={460}>
    <StatTile label="Primary" value="Python" caption="Proprio · Cricket Coach · Ember" slots={[{ code: 'PT', name: 'PyTorch' }, { code: 'SK', name: 'scikit learn', isNew: true }, { empty: true }]} />
  </Stage>
);

export const Plain = () => (
  <Stage column width={460}>
    <StatTile label="Awards" value="9" caption="mostly hackathons" />
  </Stage>
);
