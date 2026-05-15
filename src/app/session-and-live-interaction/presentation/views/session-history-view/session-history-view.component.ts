import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SessionLiveStore } from '../../../application/session-live-store';
import { TherapySession } from '../../../domain/model/therapy-session.entity';
import { DashboardLayoutComponent } from '../../../../shared/presentation/layouts/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-session-history-view',
  standalone: true,
  imports: [DashboardLayoutComponent],
  templateUrl: './session-history-view.component.html',
  styleUrl: './session-history-view.component.css',
})
export class SessionHistoryViewComponent {
  protected readonly store = inject(SessionLiveStore);
  private readonly router = inject(Router);

  protected readonly selectedSession = signal<TherapySession | null>(null);

  protected openDetail(session: TherapySession): void {
    this.store.selectSession(session);
    this.selectedSession.set(session);
  }

  protected closeDetail(): void {
    this.selectedSession.set(null);
  }

  protected startLiveSession(): void {
    const session = this.selectedSession();
    if (session) {
      this.store.selectSession(session);
    }
    void this.router.navigate(['/app/sessions/live']);
  }

  protected statusLabel(status: string): string {
    const labels: Record<string, string> = {
      scheduled: 'Programada',
      'in-progress': 'En curso',
      completed: 'Completada',
      cancelled: 'Cancelada',
    };
    return labels[status] ?? status;
  }

  protected sessionTypeLabel(type: string): string {
    return type === 'private' ? 'Privada' : 'Grupal';
  }

  protected modalityLabel(modality: string): string {
    return modality === 'presential' ? 'Presencial' : 'Virtual';
  }
}
