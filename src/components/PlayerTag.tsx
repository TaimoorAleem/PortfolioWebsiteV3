export function Level({ value = 7, size = 'sm', suffix }: { value?: number; size?: 'sm' | 'lg'; suffix?: string }) {
  return (
    <span className={size === 'lg' ? 'level level--lg' : 'level'} aria-label={suffix ? `${value} ${suffix}` : `Level ${value}`}>
      <span className="level__gem" />
      {value}
      {suffix && <span className="level__suffix">{suffix}</span>}
    </span>
  );
}

/** Compact top-right tag used on every mobile screen. */
export function PlayerTag({ name = 'TAIMOOR', level = 7 }: { name?: string; level?: number }) {
  return (
    <div className="player-tag">
      <span className="player-tag__name">{name}</span>
      <Level value={level} />
    </div>
  );
}

interface PlayerBlockProps {
  name?: string;
  initials?: string;
  status?: string;
  level?: number;
  /** Filled XP segments out of 10. */
  xp?: number;
  levelSuffix?: string;
}

export function PlayerBlock({ name = 'TAIMOOR', initials = 'TA', status = 'Toronto, ON · Open to work', level = 7, xp = 8, levelSuffix }: PlayerBlockProps) {
  return (
    <div className="player-block">
      <div className="player-block__row">
        <span className="player-block__name">{name}</span>
        <span className="player-block__avatar">{initials}</span>
      </div>
      <span className="player-block__status">{status}</span>
      <div className="player-block__xp" aria-hidden>
        {Array.from({ length: 10 }, (_, i) => <span key={i} className={i < xp ? 'on' : undefined} />)}
      </div>
      <div className="player-block__rule" />
      <Level value={level} size="lg" suffix={levelSuffix} />
    </div>
  );
}
