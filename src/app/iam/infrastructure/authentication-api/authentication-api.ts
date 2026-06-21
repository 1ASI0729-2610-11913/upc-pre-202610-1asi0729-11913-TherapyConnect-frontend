import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthenticatedUserResponse, SignInRequest, SignUpRequest, UserResponse } from './authentication-response';

export const AUTH_TOKEN_STORAGE_KEY = 'therapy-connect-auth-token';
export const AUTH_USER_ID_STORAGE_KEY = 'therapy-connect-auth-user-id';

@Injectable({ providedIn: 'root' })
export class AuthenticationApi {
  private readonly http = inject(HttpClient);
  private readonly endpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderAuthenticationEndpointPath}`;

  signIn(credentials: SignInRequest) {
    return this.http
      .post<AuthenticatedUserResponse>(`${this.endpointUrl}/sign-in`, credentials)
      .pipe(tap((response) => this.storeUser(response)));
  }

  signUp(payload: SignUpRequest) {
    return this.http
      .post<UserResponse>(`${this.endpointUrl}/sign-up`, payload)
      .pipe(switchMap(() => this.signIn({ username: payload.username, password: payload.password })));
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  }

  getCurrentUserId(): number | null {
    const raw = localStorage.getItem(AUTH_USER_ID_STORAGE_KEY);
    return raw ? Number(raw) : null;
  }

  clearToken(): void {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    localStorage.removeItem(AUTH_USER_ID_STORAGE_KEY);
  }

  private storeUser(response: AuthenticatedUserResponse): void {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, response.token);
    localStorage.setItem(AUTH_USER_ID_STORAGE_KEY, String(response.id));
  }
}
