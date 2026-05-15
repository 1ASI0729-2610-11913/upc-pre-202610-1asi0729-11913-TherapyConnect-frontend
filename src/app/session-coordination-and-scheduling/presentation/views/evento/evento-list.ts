import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { MatError } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SessionCoordinationAndSchedulingStore } from '../../../application/session-coordination-and-scheduling-store';

@Component({
  selector: 'app-evento-list',
  standalone: true,
  imports: [
    RouterLink,
    MatError,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatProgressSpinner,
  ],
  templateUrl: './evento-list.html',
  styleUrl: './evento-list.css',
})
export class EventoList {
  readonly store = inject(SessionCoordinationAndSchedulingStore);
  protected readonly router = inject(Router);

  readonly schedulingBase = '/app/scheduling';

  displayedColumns: string[] = [
    'id',
    'titulo',
    'fechaSesion',
    'horaInicio',
    'horaFin',
    'tipoSesion',
    'estadoEvento',
    'actions',
  ];

  editEvento(id: number): void {
    void this.router.navigate([this.schedulingBase, 'eventos', 'edit', id]);
  }

  deleteEvento(id: number): void {
    this.store.deleteEvento(id);
  }
}
