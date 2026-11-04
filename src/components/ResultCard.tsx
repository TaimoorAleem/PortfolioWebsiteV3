export function ResultCard({ label, place }: { label: string; place: string }) {
  return (
    <div className="result-card">
      <div className="result-card__frame">
        <div className="result-card__title">{label}</div>
      </div>
      <span className="result-card__place">{place}</span>
    </div>
  );
}
