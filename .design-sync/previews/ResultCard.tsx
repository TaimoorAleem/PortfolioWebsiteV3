import { ResultCard } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const FirstPlace = () => (
  <Stage>
    <ResultCard label="AI Cricket Coach" place="1st" />
  </Stage>
);

export const Podium = () => (
  <Stage>
    <ResultCard label="Ember" place="Top 3" />
    <ResultCard label="Rocky" place="2nd" />
  </Stage>
);
