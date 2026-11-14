import type { KeyboardEvent, ReactNode } from 'react';
import { cls } from './cls';

interface SettingsRowProps {
  label: string;
  value?: ReactNode;
  selected?: boolean;
  state?: 'hover';
  size?: 'sm' | 'md';
  gold?: boolean;
  /** Show ◀ value ▶ cyclers while selected. */
  onPrev?: () => void;
  onNext?: () => void;
  /** Static arrows without handlers (e.g. a selected link row). */
  arrows?: boolean;
  href?: string;
  onClick?: () => void;
  onHover?: () => void;
  /** Replaces the value slot (inputs). The row becomes a <label> for it. */
  children?: ReactNode;
  className?: string;
}

export function SettingsRow({ label, value, selected, state, size = 'sm', gold, onPrev, onNext, arrows, href, onClick, onHover, children, className }: SettingsRowProps) {
  const classes = cls('settings-row', size === 'md' && 'settings-row--md', selected && 'is-selected', className);
  const labelEl = <span className={cls('settings-row__label', gold && 'is-gold')}>{label}</span>;
  const cyclers = selected && (onPrev || onNext);
  const valueEl = children ?? (
    cyclers ? (
      <span className="settings-row__arrows">
        <button type="button" className="btn-reset settings-row__arrow" aria-label="Previous" onClick={(e) => { e.stopPropagation(); onPrev?.(); }}>◀</button>
        <span className="settings-row__value">{value}</span>
        <button type="button" className="btn-reset settings-row__arrow" aria-label="Next" onClick={(e) => { e.stopPropagation(); onNext?.(); }}>▶</button>
      </span>
    ) : (
      <span className="settings-row__value">{selected && arrows ? <>◀&nbsp;&nbsp;{value}&nbsp;&nbsp;▶</> : value}</span>
    )
  );

  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a className={classes} data-state={state} href={href} onClick={onClick} onMouseEnter={onHover} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
        {labelEl}{valueEl}
      </a>
    );
  }
  if (children) {
    return <label className={classes} data-state={state} onClick={onClick} onMouseEnter={onHover}>{labelEl}{valueEl}</label>;
  }
  // Nothing to do on click: a plain read-only row (no pointer, no hover, square corners).
  if (!onClick && !onPrev && !onNext && !onHover) {
    return <div className={cls(classes, 'is-static')} data-state={state}>{labelEl}{valueEl}</div>;
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); }
    if (selected && e.key === 'ArrowLeft') onPrev?.();
    if (selected && e.key === 'ArrowRight') onNext?.();
  };
  return (
    <div className={classes} data-state={state} role="button" tabIndex={0} aria-pressed={selected} onClick={onClick} onMouseEnter={onHover} onKeyDown={onKey}>
      {labelEl}{valueEl}
    </div>
  );
}
