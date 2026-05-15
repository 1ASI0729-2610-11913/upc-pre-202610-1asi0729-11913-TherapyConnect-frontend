import { Injectable, inject, signal } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { TeacherNote } from '../domain/model/teacher-note.entity';
import { TeacherNoteApi } from '../infrastructure/teacher-note-api';

export interface TeacherNotesDraft {
  studentName: string;
  content: string;
  categoriesText: string;
  sessionInfo: string;
}

/**
 * Store de aplicación para apuntes del profesor (progress-and-tracking).
 * Orquesta estado y llamadas HTTP vía {@link TeacherNoteApi}.
 */
@Injectable({ providedIn: 'root' })
export class TeacherNotesStore {
  private readonly api = inject(TeacherNoteApi);

  private readonly _notes = signal<TeacherNote[]>([]);
  private readonly _loading = signal(false);
  private readonly _selectedId = signal<number | null>(null);
  private readonly _draft = signal<TeacherNotesDraft>({
    studentName: '',
    content: '',
    categoriesText: '',
    sessionInfo: '',
  });

  readonly notes = this._notes.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly selectedId = this._selectedId.asReadonly();
  readonly draft = this._draft.asReadonly();

  loadNotes(): void {
    this._loading.set(true);
    this.api
      .list()
      .pipe(
        catchError(() => of([] as TeacherNote[])),
        finalize(() => this._loading.set(false)),
      )
      .subscribe((rows) => {
        const sorted = [...rows].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this._notes.set(sorted);
      });
  }

  patchDraft(partial: Partial<TeacherNotesDraft>): void {
    this._draft.update((d) => ({ ...d, ...partial }));
  }

  newNote(): void {
    this._selectedId.set(null);
    this._draft.set({
      studentName: '',
      content: '',
      categoriesText: '',
      sessionInfo: '',
    });
  }

  selectNote(note: TeacherNote): void {
    this._selectedId.set(note.id);
    this._draft.set({
      studentName: note.studentName,
      content: note.content,
      categoriesText: note.categories.join(', '),
      sessionInfo: note.sessionInfo,
    });
  }

  saveNote(): void {
    const d = this._draft();
    const trimmedName = d.studentName.trim();
    const trimmedContent = d.content.trim();
    if (!trimmedName && !trimmedContent) {
      return;
    }

    const id = this._selectedId();
    const isNew = id == null;
    const existing = !isNew ? this._notes().find((n) => n.id === id) : undefined;

    const entity = new TeacherNote({
      id: isNew ? 0 : id!,
      studentName: trimmedName,
      date: isNew ? new Date().toISOString() : (existing?.date ?? new Date().toISOString()),
      categories: this.parseCategories(d.categoriesText),
      content: trimmedContent,
      sessionInfo: d.sessionInfo.trim(),
    });

    this._loading.set(true);
    const req = isNew ? this.api.createFromDomain(entity) : this.api.updateFromDomain(id!, entity);

    req.pipe(finalize(() => this._loading.set(false))).subscribe((saved) => {
      const next = [...this._notes().filter((n) => n.id !== saved.id), saved];
      next.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this._notes.set(next);
      this.selectNote(saved);
    });
  }

  deleteNote(id: number): void {
    this._loading.set(true);
    this.api
      .delete(id)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe(() => {
        this.newNote();
        this.loadNotes();
      });
  }

  findNoteById(id: number): TeacherNote | undefined {
    return this._notes().find((n) => n.id === id);
  }

  private parseCategories(raw: string): string[] {
    return raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
}
