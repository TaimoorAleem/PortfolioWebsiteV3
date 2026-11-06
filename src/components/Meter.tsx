/** Segmented progress bar: `lit` of `of` segments filled. */
export function Meter({ lit, of = 10 }: { lit: number; of?: number }) {
  return (
    <span className="meter" role="img" aria-label={`${lit} of ${of}`}>
      {Array.from({ length: of }, (_, i) => <span key={i} className={i < lit ? 'is-on' : undefined} />)}
    </span>
  );
}
