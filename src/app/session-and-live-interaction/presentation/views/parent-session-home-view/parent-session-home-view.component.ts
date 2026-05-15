import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionLiveStore } from '../../../application/session-live-store';
import { DashboardLayoutComponent } from '../../../../shared/presentation/layouts/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-parent-session-home-view',
  standalone: true,
  imports: [DashboardLayoutComponent],
  templateUrl: './parent-session-home-view.component.html',
  styleUrl: './parent-session-home-view.component.css',
})
export class ParentSessionHomeViewComponent {
  protected readonly store = inject(SessionLiveStore);
  private readonly router = inject(Router);

  protected enterLiveSession(): void {
    const session = this.store.sessions()[0];
    if (session) {
      this.store.selectSession(session);
    }
    void this.router.navigate(['/app/sessions/live']);
  }
}
