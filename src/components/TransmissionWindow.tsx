import type { CSSProperties } from 'react';

const BARS = [
  { h: 22, d: 0.62 }, { h: 40, d: 0.9 }, { h: 16, d: 0.48 }, { h: 34, d: 0.8 },
  { h: 26, d: 0.55 }, { h: 44, d: 0.95 }, { h: 20, d: 0.7 },
];

interface TransmissionWindowProps {
  name?: string;
  label?: string;
  height?: number;
  portrait?: string;
  hint?: string;
  /** Animate the voice meter. */
  live?: boolean;
}

export function TransmissionWindow({ name = 'TAIMOOR ALEEM', label = 'INCOMING TRANSMISSION', height = 110, portrait, hint, live = true }: TransmissionWindowProps) {
  return (
    <div className="transmission">
      <span className="transmission__label">{label}</span>
      <div className="transmission__window" style={{ height }}>
        <div className={live ? 'transmission__meter is-live' : 'transmission__meter'} aria-hidden>
          {BARS.map((b, i) => (
            <span key={i} style={{ height: b.h, '--d': `${b.d}s`, animationDelay: `${i * 0.07}s` } as CSSProperties} />
          ))}
        </div>
        <div className="transmission__portrait">
          {portrait ? <img src={portrait} alt={name} /> : hint && <span className="transmission__hint">{hint}</span>}
          <div className="transmission__name">{name}</div>
        </div>
      </div>
    </div>
  );
}
