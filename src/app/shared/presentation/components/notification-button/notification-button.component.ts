import { Component, computed, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ActiveUserProfileService } from '../../../../iam/presentation/services/active-user-profile.service';

@Component({
  selector: 'app-notification-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatBadgeModule, MatTooltipModule, TranslateModule],
  templateUrl: './notification-button.component.html',
  styleUrl: './notification-button.component.css',
})
export class NotificationButtonComponent {
  private readonly activeUserProfile = inject(ActiveUserProfileService);

  readonly displayBadge = computed(
    () => this.activeUserProfile.profile()?.pendingNotifications ?? 0,
  );
}
