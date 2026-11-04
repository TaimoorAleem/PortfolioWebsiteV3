import type { ReactNode } from 'react';

export function InfoBox({ children }: { children: ReactNode }) {
  return (
    <div className="infobox" role="note">
      <span className="infobox__icon" aria-hidden />
      <span className="infobox__text">{children}</span>
    </div>
  );
}
