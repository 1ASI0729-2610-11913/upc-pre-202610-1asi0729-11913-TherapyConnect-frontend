import { Component, inject, computed } from '@angular/core';
import { DashboardLayoutComponent } from '../../../../shared/presentation/layouts/dashboard-layout/dashboard-layout.component';
import { CalendarViewComponent } from '../../components/calendar-view/calendar-view.component';
import { SessionCoordinationAndSchedulingStore } from '../../../application/session-coordination-and-scheduling-store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-padre-plan-institucional',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    CalendarViewComponent,
    MatCardModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './padre-plan-institucional.component.html',
  styleUrl: './padre-plan-institucional.component.css',
})
export class PadrePlanInstitucionalComponent {
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
    this.store
      .recordatorios()
      .filter((r) => r.estadoRecordatorio === 'pendiente')
      .slice(0, 3),
  );
}
