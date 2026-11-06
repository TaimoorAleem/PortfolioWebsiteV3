import type { CSSProperties, ReactNode } from 'react';
import {
  AbilityCard, ChapterCard, CutCornerButton, InfoBox, ListBar, ListGroupHeader, LoadingBar, MediaButton, MenuItem,
  PlayerBlock, PromptBar, ResultCard, SectionHeader, SettingsRow, StatTile, StateLabel, SubOptionRow, TransmissionWindow,
} from '../components';
import { MobileApp } from '../mobile/MobileApp';
import type { AppState } from '../mobile/state';
import { ThemeLab } from '../theme/ThemeLab';

const THEMES = [
  { name: 'ON DARK · SCENE C', bg: 'var(--scene-dark)' },
  {
    name: 'ON WARM HAZE · SCENE A',
    bg: 'radial-gradient(circle at 75% 20%, oklch(var(--glow-warm) / calc(0.45 * var(--glow))) 0, oklch(var(--glow-warm) / 0) 35%), radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%), var(--scene-haze)',
  },
];

const SWATCHES = [
  ['textPrimary', '--c-text'], ['textTitle', '--c-title'], ['textInactive', '--c-inactive'],
  ['selectedFill', '--c-selected'], ['panelDark', '--c-panel'], ['barDefault', '--c-bar'],
  ['amber', '--c-amber'], ['gold', '--c-gold'], ['blueInfo', '--c-blue'],
  ['orangeFocus', '--c-focus'], ['greenNew', '--c-new'], ['redAlert', '--c-alert'],
].map(([n, v]) => [n, v, `var(${v})`]);

const FRAMES: { label: string; initial: Partial<AppState> }[] = [
  { label: 'M1 · HOME', initial: { screen: 'home' } },
  { label: 'M2 · PROJECTS', initial: { screen: 'projects' } },
  { label: 'M3 · PROFILE', initial: { screen: 'profile' } },
  { label: 'M4 · CONTACT', initial: { screen: 'contact' } },
];

function Block({ title, children, style }: { title: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="sheet-block" style={style}>
      <SectionHeader>{title}</SectionHeader>
      {children}
    </div>
  );
}

function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return <div className="sheet-labeled">{children}<StateLabel>{label}</StateLabel></div>;
}

function ThemePanel({ name, bg }: { name: string; bg: string }) {
  return (
    <div className="sheet-panel" style={{ background: bg }}>
      <span className="mono-label" style={{ color: 'var(--c-muted)' }}>{name}</span>

      <Block title="TOKENS">
        <div className="sheet-swatches">
          {SWATCHES.map(([n, v, c]) => (
            <div key={n} className="sheet-swatch">
              <div style={{ height: 36, background: c, outline: '1px solid rgba(255,255,255,0.2)' }} />
              <span style={{ fontSize: 12, lineHeight: '14px', fontWeight: 600 }}>{n}</span>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--c-muted)' }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="sheet-type">
          <span style={{ fontSize: 42, lineHeight: '48px', fontWeight: 600, letterSpacing: '0.02em', color: 'var(--c-title)' }}>PAGE TITLE 42</span>
          <span style={{ fontSize: 34, lineHeight: '40px', fontWeight: 600, letterSpacing: '0.01em' }}>MENU ITEM 34</span>
          <span style={{ fontSize: 30, lineHeight: '36px', fontWeight: 600 }}>Detail heading 30</span>
          <span style={{ fontSize: 24, lineHeight: '30px', fontWeight: 600, color: 'var(--c-gold)' }}>GOLD TITLE 24</span>
          <span style={{ fontSize: 15, lineHeight: '20px', fontWeight: 600, letterSpacing: '0.04em' }}>SECTION HEADER 15</span>
          <span style={{ fontSize: 15, lineHeight: '20px', fontWeight: 600, color: 'var(--c-blue)' }}>Blue sub label 15</span>
          <span style={{ fontSize: 15, lineHeight: '22px', color: 'var(--c-muted)' }}>Body and description, 15 / 22, sentence case.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'var(--f-display)', fontWeight: 700 }}>
            <span style={{ fontSize: 44, lineHeight: '48px' }}>CHAPTER 44</span>
            <span style={{ fontSize: 80, lineHeight: '80px', color: 'var(--c-ghost)' }}>03</span>
          </span>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, letterSpacing: '0.12em' }}>HUD / TERMINAL 12</span>
        </div>
      </Block>

      <Block title="MENUITEM · SUBOPTIONROW">
        <div className="sheet-menu-grid">
          <Labeled label="default"><MenuItem label="EXPERIENCE" /></Labeled>
          <Labeled label="hover / focused"><MenuItem label="EXPERIENCE" focused /></Labeled>
          <Labeled label="special"><MenuItem label="RÉSUMÉ" special /></Labeled>
          <Labeled label="special focused"><MenuItem label="RÉSUMÉ" special focused /></Labeled>
          <Labeled label="disabled"><MenuItem label="ARCHIVE" disabled /></Labeled>
          <Labeled label="new"><MenuItem label="PROJECTS" isNew /></Labeled>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginLeft: 8 }}>
          <SubOptionRow options={['Featured', 'Hackathons', 'All Projects']} selected={0} hoverIndex={2} />
          <span style={{ marginLeft: 8 }}><StateLabel>selected · default · hover</StateLabel></span>
        </div>
      </Block>

      <Block title="LISTBAR">
        <div className="sheet-listbars">
          <Labeled label="default"><ListBar label="Mercato" /></Labeled>
          <Labeled label="hover"><ListBar label="Mercato" state="hover" /></Labeled>
          <Labeled label="selected / focused"><ListBar label="Mercato" selected /></Labeled>
          <Labeled label="disabled"><ListBar label="Mercato" disabled /></Labeled>
          <Labeled label="new"><ListBar label="Proprio" isNew /></Labeled>
          <Labeled label="featured"><ListBar label="Ember (IgnisXR)" featured /></Labeled>
          <Labeled label="featured selected"><ListBar label="Ember (IgnisXR)" featured selected /></Labeled>
          <Labeled label="group header"><ListGroupHeader>Featured</ListGroupHeader></Labeled>
        </div>
      </Block>

      <div className="sheet-two">
        <Block title="STATTILE">
          <div className="stat-wrap">
            <StatTile label="Inference" value="7×" caption="10 to 70 FPS" slots={[{ code: 'TPU', isNew: true }, { code: 'CV' }, { empty: true }]} />
            <StateLabel>slot: new · filled · empty</StateLabel>
          </div>
        </Block>
        <Block title="INFOBOX">
          <InfoBox>Press Enter on a project to open its full briefing.</InfoBox>
        </Block>
      </div>

      <Block title="ABILITYCARD">
        <div className="sheet-two" style={{ gap: 8 }}>
          <AbilityCard icon index={1} title="EDGE INFERENCE" desc="Integrated a Google Coral Edge TPU, boosting person detection from 10 to 70 FPS." />
          <AbilityCard icon core index={4} title="BIOMETRIC STREAM" desc="Kotlin Wear OS app streaming vitals over WebSocket at about 1 Hz." />
        </div>
        <StateLabel>standard · core (gold header)</StateLabel>
      </Block>

      <Block title="CUTCORNERBUTTON · MEDIABUTTON">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
          <Labeled label="default"><CutCornerButton>VIEW ON GITHUB</CutCornerButton></Labeled>
          <Labeled label="hover"><CutCornerButton state="hover">VIEW ON GITHUB</CutCornerButton></Labeled>
          <Labeled label="pressed"><CutCornerButton state="pressed">VIEW ON GITHUB</CutCornerButton></Labeled>
          <Labeled label="disabled"><CutCornerButton disabled>VIEW ON GITHUB</CutCornerButton></Labeled>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <Labeled label="default"><MediaButton label="LAUNCH DEMO" /></Labeled>
          <Labeled label="hover / focused"><MediaButton label="LAUNCH DEMO" state="hover" /></Labeled>
        </div>
      </Block>

      <div className="sheet-two">
        <Block title="SETTINGSROW">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SettingsRow label="Python" value="Proprio, Cricket Coach, Ember" />
            <SettingsRow label="Kafka" value="Dayforce" selected onPrev={() => { }} onNext={() => { }} />
            <SettingsRow label="Docker and Kubernetes" value="Mercato" state="hover" />
          </div>
          <StateLabel>default · selected · hover</StateLabel>
        </Block>
        <Block title="PROMPTBAR · PLAYERBLOCK">
          <PromptBar prompts={[{ k: '↵', label: 'Select' }, { k: 'Esc', label: 'Back' }]} />
          <PlayerBlock />
        </Block>
      </div>

      <div className="sheet-two">
        <Block title="RESULTCARD">
          <ResultCard label="CS Capstone" place="1st" />
        </Block>
        <Block title="TRANSMISSIONWINDOW">
          <div style={{ width: 300 }}><TransmissionWindow live={false} /></div>
        </Block>
      </div>

      <Block title="CHAPTERCARD · LOADINGSCREEN">
        <ChapterCard num="02" company="DAYFORCE" meta="Software Developer Intern · Jan 2025 to Dec 2025" />
        <LoadingBar progress={150 / 240} />
      </Block>
    </div>
  );
}

export function ComponentSheet() {
  return (
    <div className="sheet">
      <ThemeLab />
      <section className="sheet-section">
        <div className="sheet-head">
          <span className="sheet-head__title">MOBILE</span>
          <span className="sheet-head__sub">390 × 844 · Home, Projects, Project Detail, Contact · live, interactive</span>
          <a className="sheet-head__link" href="#/">Open the site →</a>
        </div>
        <div className="sheet-frames">
          {FRAMES.map((f) => (
            <div key={f.label} className="sheet-frame-wrap">
              <span className="mono-label">{f.label}</span>
              <div className="sheet-frame"><MobileApp routing={false} initial={f.initial} /></div>
            </div>
          ))}
        </div>
      </section>
      <section className="sheet-section">
        <div className="sheet-head">
          <span className="sheet-head__title">COMPONENT SHEET</span>
          <span className="sheet-head__sub">Every component and state, on dark and on warm haze</span>
        </div>
        <div className="sheet-themes">
          {THEMES.map((t) => <ThemePanel key={t.name} {...t} />)}
        </div>
      </section>
    </div>
  );
}
