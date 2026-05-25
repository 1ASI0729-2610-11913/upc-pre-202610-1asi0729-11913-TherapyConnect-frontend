import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ActiveUserProfileService } from '../../../../iam/presentation/services/active-user-profile.service';
import { AppNavigationContextService } from '../../services/navigation/app-navigation-context.service';

@Component({
  selector: 'app-user-profile-chip',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, TranslateModule],
  templateUrl: './user-profile-chip.component.html',
  styleUrl: './user-profile-chip.component.css',
})
export class UserProfileChipComponent {
  private readonly activeUserProfile = inject(ActiveUserProfileService);
  private readonly navigationContext = inject(AppNavigationContextService);
  private readonly router = inject(Router);

  readonly profile = this.activeUserProfile.profile;

  readonly roleTranslationKey = computed(() => {
    const roleKey = this.profile()?.roleKey;
    return roleKey ? `roles.${roleKey}` : 'roles.parent';
  });

  readonly planTranslationKey = computed(() => {
    const planKey = this.profile()?.planKey;
    return planKey ? `plans.${planKey}` : 'plans.personal';
  });

  signOut(): void {
    this.navigationContext.clearContext();
    this.activeUserProfile.clearProfile();
    void this.router.navigate(['/welcome'], { replaceUrl: true });
  }
}
