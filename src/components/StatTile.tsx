export interface Slot {
  code?: string;
  name?: string;
  isNew?: boolean;
  empty?: boolean;
}

interface StatTileProps {
  label: string;
  value: string;
  caption: string;
  slots?: Slot[];
}

export function StatTile({ label, value, caption, slots = [] }: StatTileProps) {
  return (
    <div className="stat">
      <span className="stat__label">{label}</span>
      <div className="stat__row">
        <div className="stat__tile">
          <span className="stat__value">{value}</span>
          <span className="stat__caption">{caption}</span>
        </div>
        {slots.map((s, i) => (
          <div key={i} className="slot" title={s.empty ? 'Empty slot' : s.name}>
            {s.isNew && <span className="slot__new" />}
            {s.empty ? <span className="slot__empty" aria-label="Empty slot" /> : s.code}
          </div>
        ))}
      </div>
    </div>
  );
}
