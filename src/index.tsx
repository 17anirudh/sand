/* @refresh reload */
import 'solid-devtools';
import '@/styles/index.css';
import { Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import { App } from '@/App';
import { routes } from '@/routes';

const root = document.getElementById('root');

if (root instanceof HTMLElement) {
  render(
    () => (
      <Router root={(props) => <App>{props.children}</App>}>{routes}</Router>
    ),
    root,
  );
} else if (import.meta.env.DEV) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
