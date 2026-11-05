import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SlideshowOverlay, type Slide } from '../components';
import { HOBBIES, hobbySlides } from '../data';

/** Hobby tiles. Photo hobbies open a slideshow overlay; link hobbies open the site in a new tab. */
export function Hobbies({ className = 'hobbies' }: { className?: string }) {
  const [open, setOpen] = useState<{ title: string; subtitle?: string; slides: Slide[] } | null>(null);
  const grid = useRef<HTMLDivElement>(null);  // Render the overlay at the app root (desktop stage / mobile shell) so it covers the whole screen,
  // not just the panel the tiles sit in.
  const host = grid.current?.closest<HTMLElement>('.d-stage, .m-app') ?? null;

  return (
    <>
      <div ref={grid} className={className}>
        {HOBBIES.map((h) => {
          const body = (
            <>
              <span className="hobby__label">{h.label}</span>
              {h.detail && <span className="hobby__detail">{h.detail}</span>}
              <span className="hobby__kind">
                {h.site ? (h.href ? `${h.site} ↗` : 'link coming soon') : 'photos ▸'}
              </span>
            </>
          );
          if (h.site) {
            return h.href
              ? <a key={h.label} className="hobby" href={h.href} target="_blank" rel="noreferrer">{body}</a>
              : <div key={h.label} className="hobby is-disabled">{body}</div>;
          }
          return (
            <button key={h.label} type="button" className="btn-reset hobby" onClick={() => setOpen({ title: h.label, subtitle: h.detail, slides: hobbySlides(h) })}>
              {body}
            </button>
          );
        })}
      </div>
      {open && host && createPortal(
        <SlideshowOverlay title={open.title} subtitle={open.subtitle} slides={open.slides} onClose={() => setOpen(null)} />,
        host,
      )}
    </>
  );
}
