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
import { Evento } from '../../../domain/model/evento.entity';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatInput],
  templateUrl: './evento-form.html',
  styleUrl: './evento-form.css',
})
export class EventoForm {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(SessionCoordinationAndSchedulingStore);
  private readonly api = inject(SessionCoordinationAndSchedulingApi);
  private readonly destroyRef = inject(DestroyRef);

  private readonly schedulingBase = '/app/scheduling';

  form = this.fb.group({
    titulo: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    fechaSesion: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    horaInicio: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    horaFin: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    tipoSesion: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    estadoEvento: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    profesorId: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    estudianteId: new FormControl<number | null>(null),
    aulaId: new FormControl<number | null>(null),
  });

  isEdit = false;
  eventoId: number | null = null;

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((pm) => {
      const raw = pm.get('id');
      this.eventoId = raw ? +raw : null;
      this.isEdit = !!this.eventoId;
      if (this.isEdit && this.eventoId != null) {
        this.api.getEvento(this.eventoId).subscribe((evento) => {
          this.form.patchValue({
            titulo: evento.titulo,
            fechaSesion: evento.fechaSesion,
            horaInicio: evento.horaInicio,
            horaFin: evento.horaFin,
            tipoSesion: evento.tipoSesion,
            estadoEvento: evento.estadoEvento,
            profesorId: evento.profesorId,
            estudianteId: evento.estudianteId,
            aulaId: evento.aulaId,
          });
        });
      } else {
        this.form.reset({
          titulo: '',
          fechaSesion: '',
          horaInicio: '',
          horaFin: '',
          tipoSesion: '',
          estadoEvento: '',
          profesorId: 0,
          estudianteId: null,
          aulaId: null,
        });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const evento: Evento = new Evento({
      id: this.eventoId ?? 0,
      titulo: this.form.value.titulo!,
      fechaSesion: this.form.value.fechaSesion!,
      horaInicio: this.form.value.horaInicio!,
      horaFin: this.form.value.horaFin!,
      tipoSesion: this.form.value.tipoSesion!,
      estadoEvento: this.form.value.estadoEvento!,
      profesorId: this.form.value.profesorId!,
      estudianteId: this.form.value.estudianteId ?? null,
      aulaId: this.form.value.aulaId ?? null,
    });

    if (this.isEdit) {
      this.store.updateEvento(evento);
    } else {
      this.store.addEvento(evento);
    }

    void this.router.navigate([this.schedulingBase, 'eventos']);
  }
}
