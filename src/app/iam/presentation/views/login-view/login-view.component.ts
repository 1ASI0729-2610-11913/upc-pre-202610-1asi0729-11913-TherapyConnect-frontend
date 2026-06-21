import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthenticationApi } from '../../../infrastructure/authentication-api/authentication-api';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';

type AuthMode = 'sign-in' | 'sign-up';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [AuthLayoutComponent, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css',
})
export class LoginViewComponent {
  private readonly authenticationApi = inject(AuthenticationApi);
  private readonly router = inject(Router);

  protected readonly mode = signal<AuthMode>('sign-in');
  protected readonly username = signal('');
  protected readonly password = signal('');
  protected readonly confirmPassword = signal('');
  protected readonly selectedRole = signal('ROLE_PARENT_PERSONAL');
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');

  protected readonly roleOptions = [
    { value: 'ROLE_PARENT_PERSONAL', label: 'Padre personal' },
    { value: 'ROLE_PARENT_INSTITUTIONAL', label: 'Padre institucional' },
    { value: 'ROLE_TEACHER_PERSONAL', label: 'Profesor personal' },
    { value: 'ROLE_TEACHER_INSTITUTIONAL', label: 'Profesor institucional' },
    { value: 'ROLE_INSTITUTION_ADMIN', label: 'Administrador institucional' },
  ];

  protected switchMode(mode: AuthMode): void {
    this.mode.set(mode);
    this.errorMessage.set('');
  }

  protected submit(): void {
    const username = this.username().trim();
    const password = this.password();
    if (!this.canSubmit(username, password)) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    const request$ =
      this.mode() === 'sign-in'
        ? this.authenticationApi.signIn({ username, password })
        : this.authenticationApi.signUp({
            username,
            password,
            roles: [this.selectedRole()],
          });

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigate(['/welcome']);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set(
          this.mode() === 'sign-in'
            ? 'Usuario o contrasena incorrectos.'
            : 'No se pudo crear la cuenta. Revisa los datos o intenta con otro usuario.',
        );
      },
    });
  }

  protected canSubmit(username = this.username().trim(), password = this.password()): boolean {
    if (!username || !password || this.loading()) {
      return false;
    }
    if (this.mode() === 'sign-up') {
      return password.length >= 8 && password === this.confirmPassword() && Boolean(this.selectedRole());
    }
    return true;
  }
}
