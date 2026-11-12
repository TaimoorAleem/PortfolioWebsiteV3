import { NewsTicker } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Default = () => (
  <Stage column width={560}>
    <NewsTicker lead="Ember placed " hl="Top 3 in North America at the Google Solution Challenge" />
  </Stage>
);
