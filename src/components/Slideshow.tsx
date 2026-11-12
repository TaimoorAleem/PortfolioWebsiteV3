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
  /** Show each image at the full width with its natural height (no cropping or letterboxing). */
  fitWidth?: boolean;
  /** Clicking the current slide calls this (e.g. to open a full-screen view). */
  onOpen?: (i: number) => void;
  className?: string;
  style?: CSSProperties;
}

/** Image carousel: arrows, dots, counter and swipe. Arrows and dots hide with one slide. */
export function Slideshow({ slides, index, onIndex, ratio = '16 / 9', contain, fitWidth, onOpen, className, style }: SlideshowProps) {
  const [own, setOwn] = useState(0);
  const n = slides.length;
  const cur = Math.min(index ?? own, n - 1);
  const go = (i: number) => {
    const next = (i + n) % n;
    if (index === undefined) setOwn(next);
    onIndex?.(next);
  };
  const touch = useRef<number | null>(null);
  const fit = fitWidth && !!slides[cur]?.src;

  return (
    <div
      className={cls('ss', contain && 'ss--contain', fit && 'ss--fit', className)}
      style={{ aspectRatio: fit ? undefined : ratio, ...style }}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
      }}
    >
      {fit ? (
        // Natural height: only the current image is laid out, so the frame takes its shape.
        <div className="ss__fit"><img key={cur} src={slides[cur].src} alt={slides[cur].label} /></div>
      ) : (
        <div className="ss__track" style={{ transform: `translateX(${-cur * 100}%)` }}>
          {slides.map((s, i) => (
            <div key={i} className="ss__slide" aria-hidden={i !== cur}>
              {s.src ? <img src={s.src} alt={s.label} loading="lazy" /> : <span className="ss__label">{s.label}</span>}
            </div>
          ))}
        </div>
      )}
      {onOpen && (
        <button type="button" className="btn-reset ss__open" aria-label={`View ${slides[cur]?.label ?? 'image'} full screen`} onClick={() => onOpen(cur)}>
          <span className="ss__open-tag">⤢ VIEW</span>
        </button>
      )}
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
  /** Slide to open on. */
  start?: number;
  /** Phone layout: the image spans the screen width at its natural height; tall images scroll. */
  fitWidth?: boolean;
  onClose: () => void;
}

/** Full-screen slideshow. Esc closes, ←/→ change slide; it takes the keys before the page does. */
export function SlideshowOverlay({ title, subtitle, slides, start = 0, fitWidth, onClose }: SlideshowOverlayProps) {
  const [i, setI] = useState(start);
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
    <div className={cls('ss-overlay', fitWidth && 'ss-overlay--fit')} role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
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
        <Slideshow slides={slides} index={i} onIndex={setI} contain fitWidth={fitWidth} />
      </div>
    </div>
  );
}
