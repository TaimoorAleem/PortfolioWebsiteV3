import { SettingsRow } from 'portfolio-ui';

const Stage = ({ children, width, column }: { children: React.ReactNode; width?: number; column?: boolean }) => (
  <div style={{ background: 'var(--c-page)', padding: 24, display: 'flex', flexDirection: column ? 'column' : 'row', flexWrap: 'wrap', gap: 12, alignItems: column ? 'stretch' : 'center', width }}>{children}</div>
);

export const Channels = () => (
  <Stage column width={480}>
    <SettingsRow label="Email" value="taimooraleem01@gmail.com" selected />
    <SettingsRow label="LinkedIn" value="linkedin.com/in/TaimoorAleem" href="#" />
    <SettingsRow label="Résumé" value="View and download" gold />
  </Stage>
);

export const Cycler = () => (
  <Stage column width={480}>
    <SettingsRow size="md" label="Python" value="Proprio" selected onPrev={() => {}} onNext={() => {}} />
    <SettingsRow size="md" label="Java" value="Mercato, Proprio" />
    <SettingsRow size="md" label="Hover" value="state" state="hover" />
  </Stage>
);

export const Inputs = () => (
  <Stage column width={480}>
    <SettingsRow label="Name"><input className="settings-row__input" placeholder="Your name" /></SettingsRow>
    <SettingsRow label="Message" selected><input className="settings-row__input" placeholder="A few lines is plenty" /></SettingsRow>
  </Stage>
);
