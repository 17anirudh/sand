import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';
import Home from './pages/home';
import Remainder from './pages/remainder';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/remainder',
    component: Remainder
  },
  {
    path: '**',
    component: lazy(() => import('./components/404')),
  },
];
