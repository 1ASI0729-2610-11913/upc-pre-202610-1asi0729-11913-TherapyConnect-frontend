import { computed, inject, Injectable, signal } from '@angular/core';
import { SessionChecklistItem } from '../domain/model/session-checklist.entity';
import { TherapySession } from '../domain/model/therapy-session.entity';
import { SessionLiveApi } from '../infrastructure/session-live-api/session-live-api';

@Injectable({ providedIn: 'root' })
export class SessionLiveStore {
  private readonly api = inject(SessionLiveApi);

  private readonly sessionsSignal = signal<TherapySession[]>([]);
  private readonly checklistSignal = signal<SessionChecklistItem[]>([]);
  private readonly selectedSessionSignal = signal<TherapySession | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly sessions = this.sessionsSignal.asReadonly();
  readonly checklist = this.checklistSignal.asReadonly();
  readonly selectedSession = this.selectedSessionSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly completedCount = computed(() => this.sessions().filter((s) => s.status === 'completed').length);
  readonly cancelledCount = computed(() => this.sessions().filter((s) => s.status === 'cancelled').length);
  readonly totalMinutes = computed(() => this.sessions().reduce((total, s) => total + s.durationMinutes, 0));

  constructor() {
    this.loadSessions();
    this.loadChecklist();
  }

  loadSessions(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.getSessions().subscribe({
      next: (sessions) => {
        this.sessionsSignal.set(sessions);
        if (!this.selectedSessionSignal() && sessions.length > 0) {
          this.selectedSessionSignal.set(sessions[0]);
        }
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set('No se pudieron cargar las sesiones');
        this.loadingSignal.set(false);
      },
    });
  }

  loadChecklist(): void {
    this.api.getChecklist().subscribe({
      next: (items) => this.checklistSignal.set(items),
      error: () => this.checklistSignal.set([]),
    });
  }

  selectSession(session: TherapySession): void {
    this.selectedSessionSignal.set(session);
  }

  toggleChecklist(id: string): void {
    this.checklistSignal.update((items) =>
      items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    );
  }
}
