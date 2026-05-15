import { Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InterfaceRole } from '../../../../iam/domain/model/interface-role.enum';
import { ActiveUserProfileService } from '../../../../iam/presentation/services/active-user-profile.service';
import { AppNavigationContextService } from '../../services/navigation/app-navigation-context.service';

@Component({
  selector: 'app-dashboard-welcome',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './dashboard-welcome.component.html',
  styleUrl: './dashboard-welcome.component.css',
})
export class DashboardWelcomeComponent {
  private readonly profileService = inject(ActiveUserProfileService);
  private readonly navigationContext = inject(AppNavigationContextService);

  readonly displayName = computed(() => this.profileService.profile()?.displayName?.trim() || '—');

  readonly greetingKey = computed(() => {
    const h = new Date().getHours();
    if (h < 12) {
      return 'dashboard.homeGreeting.morning';
    }
    if (h < 20) {
      return 'dashboard.homeGreeting.afternoon';
    }
    return 'dashboard.homeGreeting.evening';
  });

  readonly roleLineKey = computed(() => {
    const role = this.navigationContext.context()?.role;
    switch (role) {
      case InterfaceRole.Teacher:
        return 'dashboard.homeRole.teacher';
      case InterfaceRole.InstitutionAdmin:
        return 'dashboard.homeRole.admin';
      case InterfaceRole.Parent:
        return 'dashboard.homeRole.parent';
      default:
        return 'dashboard.homeRole.unknown';
    }
  });
}
