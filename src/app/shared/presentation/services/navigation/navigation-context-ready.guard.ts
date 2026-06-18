import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppNavigationContextService } from './app-navigation-context.service';

export const navigationContextReadyGuard: CanActivateFn = () => {
  const navigationContext = inject(AppNavigationContextService);
  const router = inject(Router);
  navigationContext.hydrateFromSession();
  if (!navigationContext.hasContext()) {
    return router.createUrlTree(['/welcome']);
  }
  return true;
};
