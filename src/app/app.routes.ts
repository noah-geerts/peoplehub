import { Routes } from '@angular/router';
import { Home } from './home/home';
import { People } from './people/people';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'people',
    component: People,
  },
];
