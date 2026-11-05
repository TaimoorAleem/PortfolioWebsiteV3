export function Level({ value = 7, size = 'sm', suffix }: { value?: number; size?: 'sm' | 'lg'; suffix?: string }) {
  return (
    <span className={size === 'lg' ? 'level level--lg' : 'level'} aria-label={suffix ? `${value} ${suffix}` : `Level ${value}`}>
      <span className="level__gem" />
      {value}
      {suffix && <span className="level__suffix">{suffix}</span>}
    </span>
  );
}

interface PlayerTagProps {
  name?: string;
  /** Omit to hide the ◆ level. */
  level?: number;
  /** Makes the tag a button (e.g. open Profile). */
  onClick?: () => void;
}

/** Compact top-right tag used on every mobile screen. */
export function PlayerTag({ name = 'TAIMOOR', level, onClick }: PlayerTagProps) {
  const inner = (
    <>
      <span className="player-tag__name">{name}</span>
      {level !== undefined && <Level value={level} />}
    </>
  );
  return onClick
    ? <button type="button" className="btn-reset player-tag player-tag--link" onClick={onClick} aria-label="Open profile">{inner}</button>
    : <div className="player-tag">{inner}</div>;
}

interface PlayerBlockProps {
  name?: string;
  initials?: string;
  status?: string;
  /** Omit to hide the ◆ level line. */
  level?: number;
  /** Filled XP segments out of 10. */
  xp?: number;
  levelSuffix?: string;
  /** Makes the block a button (e.g. open Profile). */
  onClick?: () => void;
}

export function PlayerBlock({ name = 'TAIMOOR', initials = 'TA', status = 'Toronto, ON · Open to work', level, xp = 8, levelSuffix, onClick }: PlayerBlockProps) {
  const inner = (
    <>
      <div className="player-block__row">
        <span className="player-block__name">{name}</span>
        <span className="player-block__avatar">{initials}</span>
      </div>
      <span className="player-block__status">{status}</span>
      <div className="player-block__xp" aria-hidden>
        {Array.from({ length: 10 }, (_, i) => <span key={i} className={i < xp ? 'on' : undefined} />)}
      </div>
      <div className="player-block__rule" />
      {level !== undefined && <Level value={level} size="lg" suffix={levelSuffix} />}
    </>
  );
  return onClick
    ? <button type="button" className="btn-reset player-block player-block--link" onClick={onClick} aria-label="Open profile">{inner}</button>
    : <div className="player-block">{inner}</div>;
}
