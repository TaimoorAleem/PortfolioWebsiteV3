import { PromptBar } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Home = () => (
  <Stage width={560}>
    <PromptBar prompts={[{ k: '↵', label: 'Select' }, { k: '↑↓', label: 'Navigate' }, { k: '←→', label: 'Options' }]} />
  </Stage>
);

export const Detail = () => (
  <Stage width={560}>
    <PromptBar prompts={[{ k: '↑↓', label: 'Project' }, { k: '←→', label: 'Images' }, { k: 'Esc', label: 'Back' }]} />
  </Stage>
);
