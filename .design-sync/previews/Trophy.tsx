import { Trophy } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Sizes = () => (
  <Stage>
    <span style={{ color: 'var(--c-gold)', display: 'flex', gap: 14, alignItems: 'center' }}>
      <Trophy size={12} /><Trophy size={16} /><Trophy size={24} /><Trophy size={32} />
    </span>
  </Stage>
);

export const InAwardRow = () => (
  <Stage column width={600}>
    <div className="proj-awards">
      <div className="proj-award"><Trophy className="trophy proj-award__icon" /><span className="proj-award__result">Top 3, North America</span><span className="proj-award__event">Google Solution Challenge</span><span className="proj-award__year">2026</span></div>
    </div>
  </Stage>
);
