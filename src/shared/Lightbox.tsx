import { useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { SlideshowOverlay, type Slide } from '../components';

interface Open {
  title: string;
  subtitle?: string;
  slides: Slide[];
  start: number;
}

/**
 * Full-screen photo viewer. Render `element` anywhere in the screen and call `open(...)`.
 * The overlay is portalled to the app root (desktop stage / mobile shell) so it covers
 * the whole screen rather than the panel it was opened from.
 */
export function useLightbox(): { open: (title: string, slides: Slide[], start?: number, subtitle?: string) => void; element: ReactNode } {
  const [state, setState] = useState<Open | null>(null);
  const anchor = useRef<HTMLSpanElement>(null);
  const host = anchor.current?.closest<HTMLElement>('.d-stage, .m-app') ?? null;

  const element = (
    <>
      <span ref={anchor} hidden />
      {state && host && createPortal(
        <SlideshowOverlay
          title={state.title} subtitle={state.subtitle} slides={state.slides} start={state.start}
          fitWidth={host.classList.contains('m-app')}
          onClose={() => setState(null)}
        />,
        host,
      )}
    </>
  );
  return { open: (title, slides, start = 0, subtitle) => setState({ title, subtitle, slides, start }), element };
}
