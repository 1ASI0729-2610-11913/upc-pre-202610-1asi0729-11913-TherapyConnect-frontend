import { DestroyRef, Injectable, inject } from '@angular/core';
import { computed, signal } from '@angular/core';
import { Emergency } from '../domain/model/emergency.entity';
import { EmergencyApi } from '../infrastructure/emergency-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmergencyStore {
  private readonly destroyRef = inject(DestroyRef);
  private readonly emergenciesSignal = signal<Emergency[]>([]);
  readonly emergencies = this.emergenciesSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly emergencyCount = computed(() => this.emergencies().length);

  constructor(private emergencyApi: EmergencyApi) {
    this.loadEmergencies();
  }

  addEmergency(emergency: Emergency): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.emergencyApi
      .createEmergency(emergency)
      .pipe(retry(2))
      .subscribe({
        next: (created) => {
          this.emergenciesSignal.update((list) => [...list, created]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create emergency'));
          this.loadingSignal.set(false);
        },
      });
  }

  updateEmergency(updatedEmergency: Emergency): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.emergencyApi
      .updateEmergency(updatedEmergency)
      .pipe(retry(2))
      .subscribe({
        next: (emergency) => {
          this.emergenciesSignal.update((list) =>
            list.map((e) => (e.id === emergency.id ? emergency : e)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update emergency'));
          this.loadingSignal.set(false);
        },
      });
  }

  deleteEmergency(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.emergencyApi
      .deleteEmergency(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.emergenciesSignal.update((list) => list.filter((e) => e.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete emergency'));
          this.loadingSignal.set(false);
        },
      });
  }

  private loadEmergencies(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.emergencyApi
      .getEmergencies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (emergencies) => {
          this.emergenciesSignal.set(emergencies);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load emergencies'));
          this.loadingSignal.set(false);
        },
      });
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not found`
        : error.message;
    }
    return fallback;
  }
}
