import { useEffect, useState } from 'react';
import { DesktopApp } from './desktop/DesktopApp';
import { MobileApp } from './mobile/MobileApp';
import { ComponentSheet } from './sheet/ComponentSheet';

const isSheet = () => window.location.hash.startsWith('#/components');

/** Desktop canvas needs room for the 1440 × 900 layout to stay legible once scaled. */
const DESKTOP_QUERY = '(min-width: 1024px) and (min-height: 600px)';

function useMedia(query: string) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

export function App() {
  const [sheet, setSheet] = useState(isSheet);
  const desktop = useMedia(DESKTOP_QUERY);

  useEffect(() => {
    const sync = () => setSheet(isSheet());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => { window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync); };
  }, []);

  if (sheet) return <ComponentSheet />;
  if (desktop) return <DesktopApp />;
  return (
    <div className="app-root">
      <div className="app-root__phone"><MobileApp /></div>
    </div>
  );
}
