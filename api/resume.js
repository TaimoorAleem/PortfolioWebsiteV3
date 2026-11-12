// Vercel serverless function: serves the résumé PDF from Google Drive inline, so the site can
// show it in the browser's own PDF viewer (fit to width). The Drive file is the source of truth.
import { RESUME_DRIVE_ID, fetchResume } from './resume-source.js';

export default async function handler(req, res) {
  try {
    const pdf = await fetchResume(RESUME_DRIVE_ID);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="Taimoor-Aleem-Resume.pdf"');
    // Cache briefly at the edge so edits in Drive show up within minutes.
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
    res.status(200).send(pdf);
  } catch (e) {
    res.status(502).send(`Could not load the résumé from Google Drive: ${e.message}`);
  }
}
