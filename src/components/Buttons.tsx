import type { ReactNode } from 'react';

interface CutCornerButtonProps {
  children: ReactNode;
  href?: string;
  disabled?: boolean;
  state?: 'hover' | 'pressed';
  /** Download the linked file instead of navigating; a string sets the saved file name. */
  download?: boolean | string;
  /** Open the link in a new tab. External links always do. */
  newTab?: boolean;
  onClick?: () => void;
}

export function CutCornerButton({ children, href, disabled, state, download, newTab, onClick }: CutCornerButtonProps) {
  const inner = <span className="cc-btn__inner">{children}</span>;
  if (href && !disabled) {
    const tab = newTab || /^https?:/.test(href);
    return (
      <a
        className="cc-btn"
        href={href}
        data-state={state}
        download={download === true ? '' : download || undefined}
        target={tab ? '_blank' : undefined}
        rel={tab ? 'noreferrer' : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      className="btn-reset cc-btn"
      data-state={state}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
    >
      {inner}
    </button>
  );
}

interface MediaButtonProps {
  label: string;
  href?: string;
  state?: 'hover';
  onClick?: () => void;
}

export function MediaButton({ label, href, state, onClick }: MediaButtonProps) {
  if (href) {
    return <a className="media-btn" href={href} target="_blank" rel="noreferrer" data-state={state}>{label}</a>;
  }
  return <button type="button" className="btn-reset media-btn" data-state={state} onClick={onClick}>{label}</button>;
}
