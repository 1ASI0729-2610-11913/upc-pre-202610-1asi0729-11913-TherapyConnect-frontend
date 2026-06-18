import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardLayoutComponent } from '../../../../shared/presentation/layouts/dashboard-layout/dashboard-layout.component';
import { CalendarViewComponent } from '../../components/calendar-view/calendar-view.component';
import { SessionCoordinationAndSchedulingStore } from '../../../application/session-coordination-and-scheduling-store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-padre-plan-personal',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    CalendarViewComponent,
    MatCardModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './padre-plan-personal.component.html',
  styleUrl: './padre-plan-personal.component.css',
})
export class PadrePlanPersonalComponent {
  protected readonly store = inject(SessionCoordinationAndSchedulingStore);

  protected readonly proximoEvento = computed(() => {
    const hoy = new Date().toISOString().split('T')[0];
    return (
      this.store
        .eventos()
        .filter((e) => e.fechaSesion >= hoy)
        .sort((a, b) => a.fechaSesion.localeCompare(b.fechaSesion))[0] ?? null
    );
  });

  protected readonly recordatoriosActivos = computed(() =>
    this.store.recordatorios().filter((r) => r.estadoRecordatorio === 'pendiente'),
  );

  protected readonly totalRecordatorios = computed(() => this.recordatoriosActivos().length);
}
