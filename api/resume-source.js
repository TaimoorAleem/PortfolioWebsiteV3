/** Google Drive file id of the résumé (keep in sync with src/data.ts). */
export const RESUME_DRIVE_ID = '1ih7eesc2ERyomhJ1jvsg87G3FWbXinxY';

/** Downloads the PDF bytes from Google Drive (file must be shared as "anyone with the link"). */
export async function fetchResume(id) {
  const r = await fetch(`https://drive.google.com/uc?export=download&id=${id}`, { redirect: 'follow' });
  if (!r.ok) throw new Error(`Drive responded ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.subarray(0, 5).toString() !== '%PDF-') throw new Error('Drive did not return a PDF');
  return buf;
}
