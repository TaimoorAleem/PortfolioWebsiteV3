import { InfoBox } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Default = () => (
  <Stage>
    <InfoBox>PDF not uploaded yet. Add it at public/resume.pdf.</InfoBox>
  </Stage>
);

export const Notice = () => (
  <Stage>
    <InfoBox>Transmission ready. Your mail app should open with the message filled in.</InfoBox>
  </Stage>
);
