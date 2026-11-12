import { SlideshowOverlay } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Open = () => (
  <div style={{ position: 'relative', width: 720, height: 600, overflow: 'hidden', background: 'var(--c-page)' }}>
    <SlideshowOverlay title="Ember" subtitle="XR FIREFIGHTER HELMET" slides={[{ label: 'Ember prototype photo' }, { label: 'HUD in LiDAR mode' }, { label: 'Google NYC campus day' }]} onClose={() => {}} />
  </div>
);
