import { forwardRef, type ReactNode } from 'react';
import { cls } from './cls';

interface ListBarProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  isNew?: boolean;
  featured?: boolean;
  state?: 'hover';
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export const ListBar = forwardRef<HTMLButtonElement, ListBarProps>(function ListBar(
  { label, selected, disabled, isNew, featured, state, className, onClick, onMouseEnter },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cls('btn-reset list-bar', selected && 'is-selected', className)}
      data-state={state}
      disabled={disabled}
      aria-pressed={selected}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {isNew && <span className="list-bar__new" aria-label="New" />}
      <span>{label}</span>
      {featured && <span className="list-bar__featured" aria-label="Featured" />}
    </button>
  );
});

export function ListGroupHeader({ children }: { children: ReactNode }) {
  return <div className="list-group-header">{children}</div>;
}
