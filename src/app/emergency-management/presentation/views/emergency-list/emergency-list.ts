import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { EmergencyStore } from '../../../application/emergency-store';

@Component({
  selector: 'app-emergency-list',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatProgressSpinnerModule, MatTableModule],
  templateUrl: './emergency-list.html',
  styleUrl: './emergency-list.css'
})
export class EmergencyList {
  readonly store = inject(EmergencyStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'pacienteNombre', 'descripcion', 'nivelCriticidad', 'estadoEmergencia', 'fechaActivacion', 'acciones'];

  editEmergency(id: number) {
    void this.router.navigate(['/app', 'emergency', 'emergencies', 'edit', id]);
  }

  deleteEmergency(id: number) {
    this.store.deleteEmergency(id);
  }
}
