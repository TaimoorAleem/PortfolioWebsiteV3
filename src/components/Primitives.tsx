import type { CSSProperties, ReactNode } from 'react';
import { cls } from './cls';

export function SectionHeader({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <h2 className="section-header" style={{ margin: 0, ...style }}>{children}</h2>;
}

export function StateLabel({ children }: { children: ReactNode }) {
  return <span className="state-label">{children}</span>;
}

export function MonoLabel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span className="mono-label" style={style}>{children}</span>;
}

export function NewBadge() {
  return <span className="badge-new">NEW</span>;
}

interface MediaProps {
  /** Placeholder caption, also used as alt text once `src` is supplied. */
  label: string;
  src?: string;
  tone?: 'dark' | 'warm';
}

/** 16:10 media slot. Shows a hatched placeholder until real media is supplied. */
export function MediaPlaceholder({ label, src, tone = 'dark' }: MediaProps) {
  return (
    <div className={cls('media', tone === 'warm' && 'media--warm')}>
      {src ? <img src={src} alt={label} /> : <span className="media__label">{label}</span>}
    </div>
  );
}

export function NewsTicker({ lead, hl, onClick }: { lead: string; hl: string; onClick?: () => void }) {
  return (
    <button type="button" className="btn-reset news" onClick={onClick}>
      <span className="news__tag">NEW:</span>
      <span className="news__text">{lead}<span className="news__hl">{hl}</span></span>
    </button>
  );
}
