import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AUTH_TOKEN_STORAGE_KEY } from '../../../../iam/infrastructure/authentication-api/authentication-api';
import { AppNavigationContextService } from './app-navigation-context.service';

export const navigationContextReadyGuard: CanActivateFn = () => {
  const navigationContext = inject(AppNavigationContextService);
  const router = inject(Router);
  if (!localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)) {
    return router.createUrlTree(['/login']);
  }
  navigationContext.hydrateFromSession();
  if (!navigationContext.hasContext()) {
    return router.createUrlTree(['/welcome']);
  }
  return true;
};
