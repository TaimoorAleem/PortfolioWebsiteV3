// Builds src/components as a standalone library for /design-sync (the site itself has no
// packaged dist). Output: ds-lib/ (gitignored) with an ESM bundle, .d.ts tree, one stylesheet
// and a package.json the converter reads. Run from the repo root: node .design-sync/build-lib.mjs
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const OUT = 'ds-lib';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// 1. ESM bundle of the component library (react stays external).
await build({
  entryPoints: ['src/components/index.ts'],
  outfile: `${OUT}/index.js`,
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  target: 'es2020',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  logLevel: 'warning',
});

// 2. Type declarations (the props contracts the design agent codes against).
execFileSync(process.execPath, [
  'node_modules/typescript/bin/tsc', 'src/components/index.ts',
  '--declaration', '--emitDeclarationOnly', '--outDir', `${OUT}/types`,
  '--jsx', 'react-jsx', '--module', 'esnext', '--moduleResolution', 'bundler',
  '--target', 'es2020', '--strict', '--skipLibCheck', '--isolatedModules',
], { stdio: 'inherit' });

// 3. One stylesheet: Saira from Google Fonts, then tokens and the component styles.
const css = ['src/styles/tokens.css', 'src/styles/components.css', 'src/styles/cut.css']
  .map((f) => `/* ---- ${f} ---- */\n${readFileSync(f, 'utf8')}`)
  .join('\n');
writeFileSync(`${OUT}/styles.css`,
  "@import url('https://fonts.googleapis.com/css2?family=Saira:wght@400;500;600;700&display=swap');\n\n" + css);

// 4. Package manifest the converter walks up to.
writeFileSync(`${OUT}/package.json`, JSON.stringify({
  name: 'portfolio-ui', version: '1.0.0', type: 'module',
  module: 'index.js', types: 'types/index.d.ts', style: 'styles.css',
  peerDependencies: { react: '^18', 'react-dom': '^18' },
}, null, 2) + '\n');
console.log('built ds-lib/');
