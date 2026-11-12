/** Small trophy icon; inherits the text colour. */
export function Trophy({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg className={className ?? 'trophy'} width={size} height={size} viewBox="0 0 16 16" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M4 1h8v1h3v2.5A3.5 3.5 0 0 1 11.8 8 4.5 4.5 0 0 1 9 10.4V12h2.5v1.5h1V15h-9v-1.5h1V12H7v-1.6A4.5 4.5 0 0 1 4.2 8 3.5 3.5 0 0 1 1 4.5V2h3V1Zm8 2.5v2.8a2 2 0 0 0 1.5-1.8v-1H12ZM4 3.5H2.5v1A2 2 0 0 0 4 6.3V3.5Z"
      />
    </svg>
  );
}

/** One trophy per award, for list cells. Renders nothing for 0. */
export function TrophyCount({ n }: { n: number }) {
  if (!n) return null;
  return (
    <span className="trophy-count" role="img" aria-label={`${n} award${n > 1 ? 's' : ''}`}>
      {Array.from({ length: n }, (_, i) => <Trophy key={i} size={12} />)}
    </span>
  );
}
