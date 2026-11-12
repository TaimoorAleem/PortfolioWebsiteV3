import { SocialIcons } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

const LINKS = [
  { id: 'linkedin', label: 'LinkedIn', href: '#' },
  { id: 'github', label: 'GitHub', href: '#' },
  { id: 'devpost', label: 'Devpost', href: '#' },
  { id: 'medium', label: 'Medium', href: '#' },
];

export const Profile = () => (
  <Stage column width={300}>
    <span style={{ fontSize: 22, fontWeight: 700 }}>TAIMOOR ALEEM</span>
    <span style={{ color: 'var(--c-blue)', fontSize: 14, fontWeight: 600 }}>AI Engineer · Software Developer</span>
    <SocialIcons links={LINKS} />
  </Stage>
);

export const TwoLinks = () => (
  <Stage>
    <SocialIcons links={LINKS.slice(0, 2)} />
  </Stage>
);
