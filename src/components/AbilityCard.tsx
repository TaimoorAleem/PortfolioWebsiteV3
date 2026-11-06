import { cls } from './cls';

interface AbilityCardProps {
  index: number;
  title: string;
  desc: string;
  /** Gold header + rotated icon. */
  core?: boolean;
  icon?: boolean;
  /** One row: number and title on the left, description beside them. */
  inline?: boolean;
}

export function AbilityCard({ index, title, desc, core, icon, inline }: AbilityCardProps) {
  if (inline) {
    return (
      <div className={cls('ability ability--inline', core && 'ability--core')}>
        <span className="ability__idx">{String(index).padStart(2, '0')}</span>
        <span className="ability__title">{title}</span>
        <span className="ability__desc">{desc}</span>
      </div>
    );
  }
  return (
    <div className={cls('ability', core && 'ability--core')}>
      <div className="ability__head">
        <span className="ability__idx">{String(index).padStart(2, '0')}</span>
        <span className="ability__title">{title}</span>
        <span className="ability__rule" />
      </div>
      <div className="ability__body">
        {icon && <span className="ability__icon" aria-hidden />}
        <span className="ability__desc">{desc}</span>
      </div>
    </div>
  );
}
