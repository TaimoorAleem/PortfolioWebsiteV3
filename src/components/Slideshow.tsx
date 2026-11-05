import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { cls } from './cls';

export interface Slide {
  /** Image URL; without one the slide shows a hatched placeholder with `label`. */
  src?: string;
  label: string;
}

interface SlideshowProps {
  slides: Slide[];
  /** Controlled index. Leave out to let the slideshow manage it. */
  index?: number;
  onIndex?: (i: number) => void;
  /** CSS aspect ratio of the frame, e.g. '16 / 9'. */
  ratio?: string;
  /** Fit images inside the frame instead of filling it. */
  contain?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Image carousel: arrows, dots, counter and swipe. Arrows and dots hide with one slide. */
export function Slideshow({ slides, index, onIndex, ratio = '16 / 9', contain, className, style }: SlideshowProps) {
  const [own, setOwn] = useState(0);
  const n = slides.length;
  const cur = Math.min(index ?? own, n - 1);
  const go = (i: number) => {
    const next = (i + n) % n;
    if (index === undefined) setOwn(next);
    onIndex?.(next);
  };
  const touch = useRef<number | null>(null);

  return (
    <div
      className={cls('ss', contain && 'ss--contain', className)}
      style={{ aspectRatio: ratio, ...style }}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="ss__track" style={{ transform: `translateX(${-cur * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={i} className="ss__slide" aria-hidden={i !== cur}>
            {s.src ? <img src={s.src} alt={s.label} loading="lazy" /> : <span className="ss__label">{s.label}</span>}
          </div>
        ))}
      </div>
      {n > 1 && (
        <>
          <button type="button" className="btn-reset ss__arrow ss__arrow--prev" aria-label="Previous image" onClick={() => go(cur - 1)}>◀</button>
          <button type="button" className="btn-reset ss__arrow ss__arrow--next" aria-label="Next image" onClick={() => go(cur + 1)}>▶</button>
          <span className="ss__count">{String(cur + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
          <div className="ss__dots">
            {slides.map((_, i) => (
              <button key={i} type="button" className={cls('btn-reset ss__dot', i === cur && 'is-on')} aria-label={`Image ${i + 1}`} onClick={() => go(i)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface SlideshowOverlayProps {
  title: string;
  subtitle?: string;
  slides: Slide[];
  onClose: () => void;
}

/** Full-screen slideshow. Esc closes, ←/→ change slide; it takes the keys before the page does. */
export function SlideshowOverlay({ title, subtitle, slides, onClose }: SlideshowOverlayProps) {
  const [i, setI] = useState(0);
  const n = slides.length;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') setI((v) => (v + 1) % n);
      else if (e.key === 'ArrowLeft') setI((v) => (v - 1 + n) % n);
      else return;
      e.preventDefault();
      e.stopImmediatePropagation();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [n, onClose]);

  return (
    <div className="ss-overlay" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="ss-overlay__box" onClick={(e) => e.stopPropagation()}>
        <div className="ss-overlay__head">
          <div className="ss-overlay__titles">
            <span className="ss-overlay__title">{title}</span>
            {subtitle && <span className="ss-overlay__sub">{subtitle}</span>}
          </div>
          <button ref={closeRef} type="button" className="btn-reset ss-overlay__close" onClick={onClose}>
            <span className="prompt__key">Esc</span>Close
          </button>
        </div>
        <Slideshow slides={slides} index={i} onIndex={setI} contain />
      </div>
    </div>
  );
}
