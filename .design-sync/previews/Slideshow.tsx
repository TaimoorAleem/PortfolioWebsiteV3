import { Slideshow } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Default = () => (
  <Stage width={520}>
    <div style={{ width: 472 }}><Slideshow slides={[{ label: 'Ember prototype photo' }, { label: 'HUD in LiDAR mode' }, { label: 'Google NYC campus day' }]} onOpen={() => {}} /></div>
  </Stage>
);

export const Single = () => (
  <Stage width={520}>
    <div style={{ width: 472 }}><Slideshow slides={[{ label: 'Prismarine 3D graph' }]} ratio="4 / 3" /></div>
  </Stage>
);
