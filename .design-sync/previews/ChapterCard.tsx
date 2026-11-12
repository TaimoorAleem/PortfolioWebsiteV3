import { ChapterCard } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const WithLogo = () => (
  <Stage column width={620}>
    <ChapterCard logo="" num="03" company="IGNISXR" meta="Founding Engineer · Mar 2026 to Present · Toronto, ON" />
  </Stage>
);

export const Classic = () => (
  <Stage column width={620}>
    <ChapterCard num="02" company="DAYFORCE" meta="Software Developer Intern · Jan 2025 to Dec 2025 · Toronto, ON" />
  </Stage>
);

export const Compact = () => (
  <Stage column width={380}>
    <ChapterCard compact logo="" num="05" company="BEARHACKS 2026" meta="Co-Director · Dec 2025 to Apr 2026" />
    <ChapterCard compact num="01" company="SKILL SQUIRREL" meta="Jr. Software Developer · 2024" />
  </Stage>
);
