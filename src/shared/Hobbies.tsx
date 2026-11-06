import { HOBBIES, HOBBY_PHOTOS, hobbySlides } from '../data';
import { useLightbox } from './Lightbox';

/** Hobby tiles. Photo hobbies open a slideshow overlay; link hobbies open the site in a new tab. */
export function Hobbies({ className = 'hobbies' }: { className?: string }) {
  const lightbox = useLightbox();
  return (
    <>
      <div className={className}>
        {HOBBIES.map((h) => {
          const body = (
            <>
              <span className="hobby__label">{h.label}</span>
              {h.detail && <span className="hobby__detail">{h.detail}</span>}
              {h.items && (
                <span className="hobby__items">
                  {h.items.map((it) => (it.href ? (
                    <a key={it.name} href={it.href} target="_blank" rel="noreferrer" title={it.site}>{it.name} ↗</a>
                  ) : <span key={it.name}>{it.name}</span>))}
                </span>
              )}
              {(h.site || HOBBY_PHOTOS) && (
                <span className="hobby__kind">
                  {h.site ? (h.href ? `${h.site} ↗` : 'link coming soon') : 'photos ▸'}
                </span>
              )}
            </>
          );
          if (h.site) {
            return h.href
              ? <a key={h.label} className="hobby" href={h.href} target="_blank" rel="noreferrer">{body}</a>
              : <div key={h.label} className="hobby is-disabled">{body}</div>;
          }
          if (!HOBBY_PHOTOS) return <div key={h.label} className="hobby is-plain">{body}</div>;
          return (
            <button key={h.label} type="button" className="btn-reset hobby" onClick={() => lightbox.open(h.label, hobbySlides(h), 0, h.detail)}>
              {body}
            </button>
          );
        })}
      </div>
      {lightbox.element}
    </>
  );
}

/** A row of photo thumbnails; each opens the full-screen viewer at that photo. */
export function Gallery({ title, slides, className = 'gallery' }: { title: string; slides: { src?: string; label: string }[]; className?: string }) {
  const lightbox = useLightbox();
  return (
    <>
      <div className={className}>
        {slides.map((s, i) => (
          <button key={i} type="button" className="btn-reset gallery__thumb" aria-label={`View ${s.label}`} onClick={() => lightbox.open(title, slides, i)}>
            {s.src ? <img src={s.src} alt={s.label} loading="lazy" /> : <span>{s.label}</span>}
          </button>
        ))}
      </div>
      {lightbox.element}
    </>
  );
}
