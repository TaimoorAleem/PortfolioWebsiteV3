import { defineConfig, type Connect } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-expect-error plain JS module shared with the Vercel function in /api
import { RESUME_DRIVE_ID, fetchResume } from './api/resume-source.js';

/** Serves /api/resume locally (dev and preview), mirroring the Vercel function in /api/resume.js. */
interface Res { statusCode: number; setHeader(k: string, v: string): void; end(body?: unknown): void }
const handler = (req: { url?: string }, res: Res, next: () => void) => {
  if (!req.url?.startsWith('/api/resume')) return next();
  fetchResume(RESUME_DRIVE_ID)
    .then((pdf: Uint8Array) => {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="Taimoor-Aleem-Resume.pdf"');
      res.end(pdf);
    })
    .catch((e: Error) => { res.statusCode = 502; res.end(e.message); });
};
const resumeApi = handler as unknown as Connect.NextHandleFunction;

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'resume-api',
      configureServer: (server) => { server.middlewares.use(resumeApi); },
      configurePreviewServer: (server) => { server.middlewares.use(resumeApi); },
    },
  ],
});
