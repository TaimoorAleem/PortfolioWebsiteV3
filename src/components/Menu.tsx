import { cls } from './cls';
import { NewBadge } from './Primitives';

interface MenuItemProps {
  label: string;
  focused?: boolean;
  special?: boolean;
  disabled?: boolean;
  isNew?: boolean;
  size?: 'lg' | 'md';
  /** Force a visual state (component sheet). */
  state?: 'focused';
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export function MenuItem({ label, focused, special, disabled, isNew, size = 'lg', state, onClick, onMouseEnter }: MenuItemProps) {
  return (
    <button
      type="button"
      className={cls('btn-reset menu-item', size === 'md' && 'menu-item--md', focused && 'is-focused', special && 'is-special')}
      data-state={state}
      disabled={disabled}
      aria-current={focused ? 'true' : undefined}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <span>{label}</span>
      {isNew && <NewBadge />}
    </button>
  );
}

interface SubOptionRowProps {
  options: string[];
  selected: number;
  /** Index to render in the hover state (component sheet). */
  hoverIndex?: number;
  onSelect?: (i: number) => void;
  label?: string;
  className?: string;
}

export function SubOptionRow({ options, selected, hoverIndex, onSelect, label, className }: SubOptionRowProps) {
  return (
    <div className={cls('sub-row', className)} role="group" aria-label={label}>
      {options.map((o, i) => (
        <button
          key={o}
          type="button"
          className={cls('btn-reset sub-opt', i === selected && 'is-selected')}
          data-state={i === hoverIndex ? 'hover' : undefined}
          aria-pressed={i === selected}
          onClick={() => onSelect?.(i)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
