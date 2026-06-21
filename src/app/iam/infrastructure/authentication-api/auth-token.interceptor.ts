import { HttpInterceptorFn } from '@angular/common/http';
import { AUTH_TOKEN_STORAGE_KEY } from './authentication-api';

export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  if (!token || request.headers.has('Authorization')) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
