import { computed, inject, Injectable, signal } from '@angular/core';
import { SessionChecklistItem } from '../domain/model/session-checklist.entity';
import { TherapySession } from '../domain/model/therapy-session.entity';
import { SessionLiveApi } from '../infrastructure/session-live-api/session-live-api';
import { AuthenticationApi } from '../../iam/infrastructure/authentication-api/authentication-api';
import { AppNavigationContextService } from '../../shared/presentation/services/navigation/app-navigation-context.service';
import { InterfaceRole } from '../../iam/domain/model/interface-role.enum';

@Injectable({ providedIn: 'root' })
export class SessionLiveStore {
  private readonly api = inject(SessionLiveApi);
  private readonly authApi = inject(AuthenticationApi);
  private readonly navContext = inject(AppNavigationContextService);

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

    const role = this.navContext.context()?.role;
    const userId = this.authApi.getCurrentUserId();
    const sessions$ =
      role === InterfaceRole.Teacher && userId
        ? this.api.getSessionEventsByTeacher(userId)
        : this.api.getAllSessionEvents();

    sessions$.subscribe({
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

  toggleChecklist(id: number): void {
    this.checklistSignal.update((items) =>
      items.map((item) => {
        if (item.id !== id) {
          return item;
        }
        return new SessionChecklistItem({
          id: item.id,
          groupTitle: item.groupTitle,
          label: item.label,
          checked: !item.checked,
        });
      }),
    );
  }
}
