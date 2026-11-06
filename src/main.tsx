import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/tokens.css';
import './styles/glows.css';
import './styles/components.css';
import './styles/mobile.css';
import './styles/desktop.css';
import './styles/blogs.css';
import './styles/sheet.css';
import './styles/cut.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
