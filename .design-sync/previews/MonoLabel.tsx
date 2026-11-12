import { MonoLabel } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Default = () => (
  <Stage column>
    <MonoLabel>MEDIUM · SEP 10, 2025 · 8 SECTIONS</MonoLabel>
    <MonoLabel>v2026.11</MonoLabel>
  </Stage>
);
