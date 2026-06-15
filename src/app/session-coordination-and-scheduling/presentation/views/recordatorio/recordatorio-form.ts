import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SessionCoordinationAndSchedulingStore } from '../../../application/session-coordination-and-scheduling-store';
import { SessionCoordinationAndSchedulingApi } from '../../../infrastructure/session-coordination-and-scheduling-api';
import { Recordatorio } from '../../../domain/model/recordatorio.entity';

@Component({
  selector: 'app-recordatorio-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatInput],
  templateUrl: './recordatorio-form.html',
  styleUrl: './recordatorio-form.css',
})
export class RecordatorioForm {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(SessionCoordinationAndSchedulingStore);
  private readonly api = inject(SessionCoordinationAndSchedulingApi);
  private readonly destroyRef = inject(DestroyRef);

  private readonly schedulingBase = '/app/scheduling';

  form = this.fb.group({
    titulo: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    fechaRecordatorio: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    horaRecordatorio: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    estadoRecordatorio: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    eventoId: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
  });

  isEdit = false;
  recordatorioId: number | null = null;

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((pm) => {
      const raw = pm.get('id');
      this.recordatorioId = raw ? +raw : null;
      this.isEdit = !!this.recordatorioId;
      if (this.isEdit && this.recordatorioId != null) {
        this.api.getRecordatorio(this.recordatorioId).subscribe((recordatorio) => {
          this.form.patchValue({
            titulo: recordatorio.titulo,
            fechaRecordatorio: recordatorio.fechaRecordatorio,
            horaRecordatorio: recordatorio.horaRecordatorio,
            estadoRecordatorio: recordatorio.estadoRecordatorio,
            eventoId: recordatorio.eventoId,
          });
        });
      } else {
        this.form.reset({
          titulo: '',
          fechaRecordatorio: '',
          horaRecordatorio: '',
          estadoRecordatorio: '',
          eventoId: 0,
        });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const recordatorio: Recordatorio = new Recordatorio({
      id: this.recordatorioId ?? 0,
      titulo: this.form.value.titulo!,
      fechaRecordatorio: this.form.value.fechaRecordatorio!,
      horaRecordatorio: this.form.value.horaRecordatorio!,
      estadoRecordatorio: this.form.value.estadoRecordatorio!,
      eventoId: this.form.value.eventoId!,
    });

    if (this.isEdit) {
      this.store.updateRecordatorio(recordatorio);
    } else {
      this.store.addRecordatorio(recordatorio);
    }

    void this.router.navigate([this.schedulingBase, 'recordatorios']);
  }
}
