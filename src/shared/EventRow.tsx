import type { Chapter } from '../data';

/** One organized event; links to its event page when there is one. */
export function EventRow({ ev }: { ev: NonNullable<Chapter['events']>[number] }) {
  const body = (
    <>
      <span className="d-event__date">{ev.date}</span>
      <span className="d-event__name">{ev.name}{ev.href && <span className="d-event__arrow"> ↗</span>}</span>
      {ev.note && <span className="d-event__note">{ev.note}</span>}
    </>
  );
  return (
    <li>
      {ev.href
        ? <a className="d-event d-event--link" href={ev.href} target="_blank" rel="noreferrer">{body}</a>
        : <div className="d-event">{body}</div>}
    </li>
  );
}
