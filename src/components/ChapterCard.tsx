import { cls } from './cls';

interface ChapterCardProps {
  num: string;
  company: string;
  meta: string;
  compact?: boolean;
  /** Square logo left of the name; pass '' for a monogram. Omit for the classic number-first layout. */
  logo?: string;
}

export function ChapterCard({ num, company, meta, compact, logo }: ChapterCardProps) {
  if (logo !== undefined) {
    return (
      <div className={cls('chapter chapter--logo', compact && 'chapter--compact')}>
        <span className="chapter__logo" aria-hidden>{logo ? <img src={logo} alt="" /> : <span>{company.charAt(0)}</span>}</span>
        <div className="chapter__text">
          <span className="chapter__company">{company}</span>
          <span className="chapter__meta">{meta}</span>
        </div>
        <span className="chapter__num" aria-hidden>{num}</span>
      </div>
    );
  }
  return (
    <div className={cls('chapter', compact && 'chapter--compact')}>
      <span className="chapter__num" aria-hidden>{num}</span>
      <div className="chapter__text">
        <span className="chapter__company">{company}</span>
        <span className="chapter__meta">{meta}</span>
      </div>
    </div>
  );
}

/** progress: 0..1 for a static bar; omit it to animate a full load. */
export function LoadingBar({ progress }: { progress?: number }) {
  const animated = progress === undefined;
  return (
    <div className="loading" role="progressbar" aria-label="Loading" aria-valuemin={0} aria-valuemax={100} aria-valuenow={animated ? undefined : Math.round(progress * 100)}>
      <span className="loading__label">LOADING</span>
      <div className="loading__track">
        <div className={cls('loading__fill', animated && 'is-animated')} style={animated ? undefined : { width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}

export function LoadingScreen({ onSkip }: { onSkip: () => void }) {
  return (
    <div className="loading-screen" onClick={onSkip}>
      <LoadingBar />
    </div>
  );
}
