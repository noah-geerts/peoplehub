import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, CanDeactivateFn, CanMatchFn, Route, RouterStateSnapshot, Routes, UrlSegment } from '@angular/router';
import { Home } from './home/home';
import { People } from './people/people';
import { Gest } from './gest/gest';
import { Create } from './create/create';
import { AdminPortal } from './admin-portal/admin-portal';
import { inject } from '@angular/core';
import { AuthService } from '../services/authService';
import { Login } from './login/login';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  if (authService.authenticated())
    return true
  return false
}

export const creatorGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  if (authService.authenticated() && authService.role() === 'creator')
    return true
  return false
}

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  if (authService.authenticated() && authService.role() === 'admin')
    return true
  return false
}

export const adminChildGuard: CanActivateChildFn = (
  childRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  if (authService.authenticated() && authService.role() === 'admin')
    return true
  return false
}

export const canLeaveHomeGuard: CanDeactivateFn<Home> = (
  component: Home,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot,
) => {
  return component.canLeave;
}

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminPortal,
    canActivateChild: [adminChildGuard],
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: Home,
        canDeactivate: [canLeaveHomeGuard]
      },
      {
        path: 'people',
        component: People
      },
    ]
  },
  {
    path: 'gest',
    component: Gest,
    canActivate: [authGuard],
  },
  {
    path: 'create',
    component: Create,
    canActivate: [creatorGuard]
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: "**",
    redirectTo: "login"
  }
];
