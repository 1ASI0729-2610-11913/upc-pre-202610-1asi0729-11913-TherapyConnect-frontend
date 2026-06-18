import { Component } from '@angular/core';
import {inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EmergencyStore} from '../../../application/emergency-store';
import {Emergency} from '../../../domain/model/emergency.entity';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-emergency-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatInputModule],
  templateUrl: './emergency-form.html',
  styleUrl: './emergency-form.css'
})
export class EmergencyForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(EmergencyStore);

  form = this.fb.group({
    descripcion:          new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    nivelCriticidad:      new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    estadoEmergencia:     new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    pacienteId:           new FormControl<number>(0,  { nonNullable: true, validators: [Validators.required] }),
    pacienteNombre:       new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    profesionalAsignado:  new FormControl<string | null>(null)
  });

  isEdit = false;
  emergencyId: number | null = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.emergencyId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.emergencyId;
      if (this.isEdit) {
        const emergency = this.store.emergencies().find(e => e.id === this.emergencyId);
        if (emergency) {
          this.form.patchValue({
            descripcion:         emergency.descripcion,
            nivelCriticidad:     emergency.nivelCriticidad,
            estadoEmergencia:    emergency.estadoEmergencia,
            pacienteId:          emergency.pacienteId,
            pacienteNombre:      emergency.pacienteNombre,
            profesionalAsignado: emergency.profesionalAsignado
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    const emergency: Emergency = new Emergency({
      id:                  this.emergencyId ?? 0,
      descripcion:         this.form.value.descripcion!,
      nivelCriticidad:     this.form.value.nivelCriticidad! as any,
      estadoEmergencia:    this.form.value.estadoEmergencia! as any,
      pacienteId:          this.form.value.pacienteId!,
      pacienteNombre:      this.form.value.pacienteNombre!,
      fechaActivacion:     new Date().toISOString(),
      profesionalAsignado: this.form.value.profesionalAsignado ?? null
    });

    if (this.isEdit) {
      this.store.updateEmergency(emergency);
    } else {
      this.store.addEmergency(emergency);
    }

    void this.router.navigate(['/app', 'emergency', 'emergencies']);
  }
}

