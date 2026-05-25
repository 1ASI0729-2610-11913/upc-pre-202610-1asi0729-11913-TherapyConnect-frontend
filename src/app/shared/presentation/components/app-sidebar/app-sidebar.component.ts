import { Component, inject, output } from '@angular/core';
import { IsActiveMatchOptions, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AppNavigationContextService } from '../../services/navigation/app-navigation-context.service';
import { ActiveUserProfileService } from '../../../../iam/presentation/services/active-user-profile.service';
import { NavigationItem } from '../../../domain/model/navigation-context.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatTooltipModule, TranslateModule, RouterLink, RouterLinkActive],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.css',
})
export class AppSidebarComponent {
  private readonly router = inject(Router);
  private readonly navigationContext = inject(AppNavigationContextService);
  private readonly activeUserProfile = inject(ActiveUserProfileService);

  readonly navigate = output<void>();

  readonly menuGroups = this.navigationContext.menuGroups;

  readonly navLinkActiveMatch: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };

  readonly navLinkSubsetMatch: IsActiveMatchOptions = {
    paths: 'subset',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };

  onItemClick(item: NavigationItem): void {
    if (item.signOut) {
      this.navigationContext.clearContext();
      this.activeUserProfile.clearProfile();
      void this.router.navigate(['/welcome'], { replaceUrl: true });
      this.navigate.emit();
      return;
    }
    if (item.route) {
      void this.router.navigateByUrl(item.route);
      this.navigate.emit();
    }
  }
}
