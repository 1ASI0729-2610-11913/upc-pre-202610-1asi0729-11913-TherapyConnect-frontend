import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardLayoutComponent } from '../../../../shared/presentation/layouts/dashboard-layout/dashboard-layout.component';
import { CalendarViewComponent } from '../../components/calendar-view/calendar-view.component';
import { SessionCoordinationAndSchedulingStore } from '../../../application/session-coordination-and-scheduling-store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { Evento } from '../../../domain/model/evento.entity';

@Component({
  selector: 'app-profesor-plan-personal',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    CalendarViewComponent,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    RouterLink,
  ],
  templateUrl: './profesor-plan-personal.component.html',
  styleUrl: './profesor-plan-personal.component.css',
})
export class ProfesorPlanPersonalComponent {
  protected readonly store = inject(SessionCoordinationAndSchedulingStore);
  protected readonly dialog = inject(MatDialog);

  protected readonly solicitudes = computed(() =>
    this.store.eventos().filter((e) => e.estadoEvento === 'pendiente'),
  );

  protected selectedEvento = signal<Evento | null>(null);
  protected showDetalle = signal(false);
  protected showProgramar = signal(false);
  protected showRechazar = signal(false);
  protected motivoRechazo = signal('');

  openDetalle(evento: Evento): void {
    this.selectedEvento.set(evento);
    this.showDetalle.set(true);
    this.showProgramar.set(false);
    this.showRechazar.set(false);
  }

  openProgramar(): void {
    this.showDetalle.set(false);
    this.showProgramar.set(true);
  }

  openRechazar(): void {
    this.showDetalle.set(false);
    this.showRechazar.set(true);
  }

  closeAll(): void {
    this.showDetalle.set(false);
    this.showProgramar.set(false);
    this.showRechazar.set(false);
    this.selectedEvento.set(null);
    this.motivoRechazo.set('');
  }

  confirmarProgramar(): void {
    const evento = this.selectedEvento();
    if (!evento) return;
    this.store.updateEventoEstado(evento.id, 'confirmado');
    this.closeAll();
  }

  confirmarRechazo(): void {
    const evento = this.selectedEvento();
    if (!evento) return;
    this.store.updateEventoEstado(evento.id, 'rechazado');
    this.closeAll();
  }
}
