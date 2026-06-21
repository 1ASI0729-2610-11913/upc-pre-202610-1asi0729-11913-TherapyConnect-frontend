import { computed, inject, Injectable, signal } from '@angular/core';
import { forkJoin, retry } from 'rxjs';
import { Evento } from '../domain/model/evento.entity';
import { Recordatorio } from '../domain/model/recordatorio.entity';
import { SessionCoordinationAndSchedulingApi } from '../infrastructure/session-coordination-and-scheduling-api';

@Injectable({ providedIn: 'root' })
export class SessionCoordinationAndSchedulingStore {
  private readonly api = inject(SessionCoordinationAndSchedulingApi);

  private readonly eventosSignal = signal<Evento[]>([]);
  private readonly recordatoriosSignal = signal<Recordatorio[]>([]);

  readonly eventos = this.eventosSignal.asReadonly();
  readonly recordatorios = this.recordatoriosSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly eventoCount = computed(() => this.eventos().length);
  readonly recordatorioCount = computed(() => this.recordatorios().length);

  constructor() {
    this.loadInitial();
  }

  addEvento(evento: Evento): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api
      .createEvento(evento)
      .pipe(retry(2))
      .subscribe({
        next: (createdEvento) => {
          this.eventosSignal.update((eventos) => [...eventos, createdEvento]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create evento'));
          this.loadingSignal.set(false);
        },
      });
  }

  updateEvento(updatedEvento: Evento): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api
      .updateEvento(updatedEvento)
      .pipe(retry(2))
      .subscribe({
        next: (evento) => {
          this.eventosSignal.update((eventos) =>
            eventos.map((e) => (e.id === evento.id ? evento : e)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update evento'));
          this.loadingSignal.set(false);
        },
      });
  }

  updateEventoEstado(id: number, estado: string): void {
    const evento = this.eventosSignal().find((e) => e.id === id);
    if (!evento) return;

    const updatedEvento = new Evento({
      id: evento.id,
      titulo: evento.titulo,
      fechaSesion: evento.fechaSesion,
      horaInicio: evento.horaInicio,
      horaFin: evento.horaFin,
      tipoSesion: evento.tipoSesion,
      estadoEvento: estado,
      profesorId: evento.profesorId,
      estudianteId: evento.estudianteId,
      aulaId: evento.aulaId,
    });

    this.updateEvento(updatedEvento);
  }

  deleteEvento(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api
      .deleteEvento(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.eventosSignal.update((eventos) => eventos.filter((e) => e.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete evento'));
          this.loadingSignal.set(false);
        },
      });
  }

  addRecordatorio(recordatorio: Recordatorio): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api
      .createRecordatorio(recordatorio)
      .pipe(retry(2))
      .subscribe({
        next: (createdRecordatorio) => {
          this.recordatoriosSignal.update((recordatorios) => [
            ...recordatorios,
            createdRecordatorio,
          ]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create recordatorio'));
          this.loadingSignal.set(false);
        },
      });
  }

  updateRecordatorio(updatedRecordatorio: Recordatorio): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api
      .updateRecordatorio(updatedRecordatorio)
      .pipe(retry(2))
      .subscribe({
        next: (recordatorio) => {
          this.recordatoriosSignal.update((recordatorios) =>
            recordatorios.map((r) => (r.id === recordatorio.id ? recordatorio : r)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update recordatorio'));
          this.loadingSignal.set(false);
        },
      });
  }

  deleteRecordatorio(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api
      .deleteRecordatorio(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.recordatoriosSignal.update((recordatorios) =>
            recordatorios.filter((r) => r.id !== id),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete recordatorio'));
          this.loadingSignal.set(false);
        },
      });
  }

  private loadInitial(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    forkJoin({
      eventos: this.api.getEventos().pipe(retry(1)),
      recordatorios: this.api.getRecordatorios().pipe(retry(1)),
    }).subscribe({
      next: ({ eventos, recordatorios }) => {
        this.eventosSignal.set(eventos);
        this.recordatoriosSignal.set(recordatorios);
        this.loadingSignal.set(false);
      },
      error: () => {
        // Si los recordatorios fallan, cargamos solo eventos
        this.api.getEventos().subscribe({
          next: (eventos) => {
            this.eventosSignal.set(eventos);
            this.recordatoriosSignal.set([]);
            this.loadingSignal.set(false);
          },
          error: (err) => {
            this.errorSignal.set(this.formatError(err, 'No se pudieron cargar los eventos'));
            this.loadingSignal.set(false);
          },
        });
      },
    });
  }

  private formatError(error: unknown, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not found`
        : error.message;
    }
    return fallback;
  }
}
