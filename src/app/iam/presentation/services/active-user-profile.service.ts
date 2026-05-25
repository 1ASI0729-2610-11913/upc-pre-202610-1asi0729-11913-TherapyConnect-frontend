import { inject, Injectable, signal } from '@angular/core';
import { AppNavigationContextService } from '../../../shared/presentation/services/navigation/app-navigation-context.service';
import { UserProfile } from '../../domain/model/user-profile.entity';
import { UserProfileApi } from '../../infrastructure/user-profile-api/user-profile-api';

@Injectable({ providedIn: 'root' })
export class ActiveUserProfileService {
  private readonly userProfileApi = inject(UserProfileApi);
  private readonly navigationContext = inject(AppNavigationContextService);

  readonly profile = signal<UserProfile | undefined>(undefined);
  readonly loading = signal(false);

  reloadFromContext(): void {
    const ctx = this.navigationContext.context();
    if (!ctx) {
      this.profile.set(undefined);
      return;
    }
    this.loading.set(true);
    this.userProfileApi.findByPlanAndRole(ctx.plan, ctx.role).subscribe({
      next: (value) => {
        this.profile.set(value);
        this.loading.set(false);
      },
      error: () => {
        this.profile.set(undefined);
        this.loading.set(false);
      },
    });
  }

  clearProfile(): void {
    this.profile.set(undefined);
    this.loading.set(false);
  }
}
