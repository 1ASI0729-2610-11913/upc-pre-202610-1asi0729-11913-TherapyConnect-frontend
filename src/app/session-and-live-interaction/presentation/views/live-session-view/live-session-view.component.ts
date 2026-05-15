import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionLiveStore } from '../../../application/session-live-store';

@Component({
  selector: 'app-live-session-view',
  standalone: true,
  templateUrl: './live-session-view.component.html',
  styleUrl: './live-session-view.component.css',
})
export class LiveSessionViewComponent {
  protected readonly store = inject(SessionLiveStore);
  private readonly router = inject(Router);

  protected finishSession(): void {
    void this.router.navigate(['/app/sessions']);
  }

  protected toggleItem(id: number): void {
    this.store.toggleChecklist(id);
  }

  protected groups(): string[] {
    return Array.from(new Set(this.store.checklist().map((item) => item.groupTitle)));
  }
}
