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
  /** Filled segments of the bar. */
  xp?: number;
  /** Total segments in the bar (default 10). */
  xpOf?: number;
  /** What the bar tracks; shown as a tooltip and read by screen readers (e.g. "Quest: Proprio, phase 1 of 6"). */
  xpLabel?: string;
  /** Short caption under the bar (e.g. "QUEST: PROPRIO 1/6"). */
  xpCaption?: string;
  /** Makes the bar and its label a button (e.g. open Awards). */
  onXpClick?: () => void;
  levelSuffix?: string;
  /** Makes the name, badge and status a button (e.g. open Profile). */
  onClick?: () => void;
}

export function PlayerBlock({ name = 'TAIMOOR', initials = 'TA', status = 'Toronto, ON', level, xp = 8, xpOf = 10, xpLabel, xpCaption, onXpClick, levelSuffix, onClick }: PlayerBlockProps) {
  const id = (
    <>
      <div className="player-block__row">
        <span className="player-block__name">{name}</span>
        <span className="player-block__avatar">{initials}</span>
      </div>
      <span className="player-block__status">{status}</span>
    </>
  );
  const bar = (
    <>
      <div className="player-block__xp" style={{ gridTemplateColumns: `repeat(${xpOf}, 1fr)` }} aria-hidden>
        {Array.from({ length: xpOf }, (_, i) => <span key={i} className={i < xp ? 'on' : undefined} />)}
      </div>
      {xpCaption && <span className="player-block__xp-caption">{xpCaption}</span>}
    </>
  );
  return (
    <div className="player-block">
      {onClick
        ? <button type="button" className="btn-reset player-block__id player-block--link" onClick={onClick} aria-label="Open profile">{id}</button>
        : <div className="player-block__id">{id}</div>}
      {onXpClick
        ? <button type="button" className="btn-reset player-block__bar player-block__bar--link" onClick={onXpClick} title={xpLabel} aria-label={xpLabel ?? 'Open'}>{bar}</button>
        : <div className="player-block__bar" title={xpLabel}>{bar}</div>}
      <div className="player-block__rule" />
      {level !== undefined && <Level value={level} size="lg" suffix={levelSuffix} />}
    </div>
  );
}
