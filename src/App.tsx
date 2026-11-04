import { useEffect, useState } from 'react';
import { MobileApp } from './mobile/MobileApp';
import { ComponentSheet } from './sheet/ComponentSheet';

const isSheet = () => window.location.hash.startsWith('#/components');

export function App() {
  const [sheet, setSheet] = useState(isSheet);
  useEffect(() => {
    const sync = () => setSheet(isSheet());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => { window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync); };
  }, []);

  if (sheet) return <ComponentSheet />;
  return (
    <div className="app-root">
      <div className="app-root__phone"><MobileApp /></div>
    </div>
  );
}
