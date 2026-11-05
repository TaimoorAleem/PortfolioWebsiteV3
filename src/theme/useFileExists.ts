import { useEffect, useState } from 'react';

/**
 * Whether a PDF exists at `url`. null while checking.
 * Dev and preview servers answer missing paths with index.html (status 200),
 * so this checks the content type rather than just the status.
 */
export function useFileExists(url: string, type = 'pdf'): boolean | null {
  const [exists, setExists] = useState<boolean | null>(null);
  useEffect(() => {
    let live = true;
    setExists(null);
    fetch(url, { method: 'HEAD' })
      .then((r) => { if (live) setExists(r.ok && (r.headers.get('content-type') ?? '').includes(type)); })
      .catch(() => { if (live) setExists(false); });
    return () => { live = false; };
  }, [url, type]);
  return exists;
}
