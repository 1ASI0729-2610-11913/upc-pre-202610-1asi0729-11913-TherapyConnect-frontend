import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppNavbarComponent } from '../../components/app-navbar/app-navbar.component';
import { AppSidebarComponent } from '../../components/app-sidebar/app-sidebar.component';
import { ResponsiveDrawerComponent } from '../../components/responsive-drawer/responsive-drawer.component';
import { ActiveUserProfileService } from '../../../../iam/presentation/services/active-user-profile.service';
import { AppNavigationContextService } from '../../services/navigation/app-navigation-context.service';

@Component({
  selector: 'app-app-shell-layout',
  standalone: true,
  imports: [ResponsiveDrawerComponent, AppSidebarComponent, AppNavbarComponent, RouterOutlet],
  templateUrl: './app-shell-layout.component.html',
  styleUrl: './app-shell-layout.component.css',
})
export class AppShellLayoutComponent implements OnInit {
  private readonly activeUserProfile = inject(ActiveUserProfileService);
  private readonly router = inject(Router);
  private readonly navigationContext = inject(AppNavigationContextService);

  ngOnInit(): void {
    this.activeUserProfile.reloadFromContext();
    const path = this.router.url.split('?')[0];
    if (path === '/app' || path.endsWith('/app/')) {
      void this.router.navigate(['/app', this.navigationContext.dashboardSegment()], {
        replaceUrl: true,
      });
    }
  }
}
