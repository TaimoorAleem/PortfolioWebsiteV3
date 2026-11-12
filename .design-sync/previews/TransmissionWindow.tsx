import { TransmissionWindow } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Default = () => (
  <Stage column width={460}>
    <TransmissionWindow hint="portrait" live={false} />
  </Stage>
);

export const Live = () => (
  <Stage column width={460}>
    <TransmissionWindow name="TAIMOOR ALEEM" label="INCOMING TRANSMISSION" height={150} hint="portrait" />
  </Stage>
);
