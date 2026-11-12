import { CutCornerButton } from 'portfolio-ui';

const Stage = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>{children}</div>
);

export const Default = () => (
  <Stage>
    <CutCornerButton>VIEW EMBER</CutCornerButton>
    <CutCornerButton href="#">GITHUB</CutCornerButton>
    <CutCornerButton href="#">DEVPOST</CutCornerButton>
  </Stage>
);

export const States = () => (
  <Stage>
    <CutCornerButton>DEFAULT</CutCornerButton>
    <CutCornerButton state="hover">HOVER</CutCornerButton>
    <CutCornerButton state="pressed">PRESSED</CutCornerButton>
    <CutCornerButton disabled>DISABLED</CutCornerButton>
  </Stage>
);

export const Download = () => (
  <Stage>
    <CutCornerButton href="#" download="Taimoor-Aleem-Resume.pdf">DOWNLOAD PDF</CutCornerButton>
    <CutCornerButton href="#" newTab>OPEN IN DRIVE</CutCornerButton>
  </Stage>
);
