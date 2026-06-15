import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { MatError } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SessionCoordinationAndSchedulingStore } from '../../../application/session-coordination-and-scheduling-store';

@Component({
  selector: 'app-recordatorio-list',
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
  templateUrl: './recordatorio-list.html',
  styleUrl: './recordatorio-list.css',
})
export class RecordatorioList {
  readonly store = inject(SessionCoordinationAndSchedulingStore);
  protected readonly router = inject(Router);

  readonly schedulingBase = '/app/scheduling';

  displayedColumns: string[] = [
    'id',
    'titulo',
    'fechaRecordatorio',
    'horaRecordatorio',
    'estadoRecordatorio',
    'eventoId',
    'actions',
  ];

  editRecordatorio(id: number): void {
    void this.router.navigate([this.schedulingBase, 'recordatorios', 'edit', id]);
  }

  deleteRecordatorio(id: number): void {
    this.store.deleteRecordatorio(id);
  }
}
