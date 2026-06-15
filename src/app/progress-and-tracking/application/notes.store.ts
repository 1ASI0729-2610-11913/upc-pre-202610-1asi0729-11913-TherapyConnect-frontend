import { Injectable, computed, inject, signal } from '@angular/core';
import { catchError, finalize, Observable, of } from 'rxjs';
import { ParentNote } from '../domain/model/parent-note.entity';
import { TeacherInstitutionalNote } from '../domain/model/teacher-institutional-note.entity';
import { TeacherPersonalNote } from '../domain/model/teacher-personal-note.entity';
import { ParentNoteApi } from '../infrastructure/parent-note-api';
import { TeacherInstitutionalNoteApi } from '../infrastructure/teacher-institutional-note-api';
import { TeacherPersonalNoteApi } from '../infrastructure/teacher-personal-note-api';

export type NotesContext = 'institutional-teacher' | 'personal-teacher' | 'personal-parent';

export type TrackedNote = TeacherInstitutionalNote | TeacherPersonalNote | ParentNote;

export type CategoryPreset = '' | 'TDAH' | 'Asperger' | 'Other';

export const DEFAULT_CATEGORY_PRESETS: CategoryPreset[] = ['TDAH', 'Asperger', 'Other'];

export interface NotesDraft {
  studentName: string;
  childName: string;
  content: string;
  sessionInfo: string;
  nextSteps: string;
  categoryPreset: CategoryPreset;
  categoryCustom: string;
}

function emptyDraft(): NotesDraft {
  return {
    studentName: '',
    childName: '',
    content: '',
    sessionInfo: '',
    nextSteps: '',
    categoryPreset: '',
    categoryCustom: '',
  };
}

function categoriesToDraft(categories: string[]): Pick<NotesDraft, 'categoryPreset' | 'categoryCustom'> {
  if (categories.length === 0) {
    return { categoryPreset: '', categoryCustom: '' };
  }

  const first = categories[0].trim();
  if (first === 'TDAH' || first === 'Asperger') {
    return { categoryPreset: first, categoryCustom: '' };
  }

  return { categoryPreset: 'Other', categoryCustom: first };
}

function draftToCategories(draft: NotesDraft): string[] {
  if (!draft.categoryPreset) return [];
  if (draft.categoryPreset === 'Other') {
    const text = draft.categoryCustom.trim();
    return text ? [text] : [];
  }
  return [draft.categoryPreset];
}

/**
 * Store centralizado de aplicación para los tres tipos de apuntes.
 */
@Injectable({ providedIn: 'root' })
export class NotesStore {
  private readonly institutionalApi = inject(TeacherInstitutionalNoteApi);
  private readonly personalTeacherApi = inject(TeacherPersonalNoteApi);
  private readonly parentApi = inject(ParentNoteApi);

  private readonly _context = signal<NotesContext | null>(null);
  private readonly _institutionalNotes = signal<TeacherInstitutionalNote[]>([]);
  private readonly _personalTeacherNotes = signal<TeacherPersonalNote[]>([]);
  private readonly _parentNotes = signal<ParentNote[]>([]);
  private readonly _loading = signal(false);
  private readonly _selectedId = signal<number | null>(null);
  private readonly _draft = signal<NotesDraft>(emptyDraft());

  readonly context = this._context.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly selectedId = this._selectedId.asReadonly();
  readonly draft = this._draft.asReadonly();
  readonly categoryPresets = DEFAULT_CATEGORY_PRESETS;

  readonly notes = computed<TrackedNote[]>(() => {
    switch (this._context()) {
      case 'institutional-teacher':
        return this._institutionalNotes();
      case 'personal-teacher':
        return this._personalTeacherNotes();
      case 'personal-parent':
        return this._parentNotes();
      default:
        return [];
    }
  });

  initContext(context: NotesContext): void {
    if (this._context() === context) {
      this.loadNotes();
      return;
    }
    this._context.set(context);
    this.newNote();
    this.loadNotes();
  }

  loadNotes(): void {
    const context = this._context();
    if (!context) return;

    this._loading.set(true);
    this.fetchForContext(context)
      .pipe(
        catchError(() => of([] as TrackedNote[])),
        finalize(() => this._loading.set(false)),
      )
      .subscribe((rows) => {
        const sorted = [...rows].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.setNotesForContext(context, sorted);
      });
  }

  patchDraft(partial: Partial<NotesDraft>): void {
    this._draft.update((d) => ({ ...d, ...partial }));
  }

  newNote(): void {
    this._selectedId.set(null);
    this._draft.set(emptyDraft());
  }

  selectNote(note: TrackedNote): void {
    this._selectedId.set(note.id);
    const categoryFields = categoriesToDraft(note.categories);

    if (note instanceof ParentNote) {
      this._draft.set({
        studentName: '',
        childName: note.childName,
        content: note.content,
        sessionInfo: '',
        nextSteps: note.nextSteps,
        ...categoryFields,
      });
      return;
    }

    this._draft.set({
      studentName: note.studentName,
      childName: '',
      content: note.content,
      sessionInfo: note.sessionInfo,
      nextSteps: '',
      ...categoryFields,
    });
  }

  saveNote(): void {
    const context = this._context();
    if (!context) return;

    const d = this._draft();
    if (!this.canSave(d, context)) return;

    const id = this._selectedId();
    const isNew = id == null;
    const existing = !isNew ? this.findNoteById(id!) : undefined;
    const categories = draftToCategories(d);
    const date = isNew
      ? new Date().toISOString()
      : (existing?.date ?? new Date().toISOString());

    this._loading.set(true);

    let request$: Observable<TrackedNote>;
    if (context === 'institutional-teacher') {
      const entity = new TeacherInstitutionalNote({
        id: isNew ? 0 : id!,
        studentName: d.studentName.trim(),
        date,
        categories,
        content: d.content.trim(),
        sessionInfo: d.sessionInfo.trim(),
      });
      request$ = isNew
        ? this.institutionalApi.createNote(entity)
        : this.institutionalApi.updateNote(id!, entity);
    } else if (context === 'personal-teacher') {
      const entity = new TeacherPersonalNote({
        id: isNew ? 0 : id!,
        studentName: d.studentName.trim(),
        date,
        categories,
        content: d.content.trim(),
        sessionInfo: d.sessionInfo.trim(),
      });
      request$ = isNew
        ? this.personalTeacherApi.createNote(entity)
        : this.personalTeacherApi.updateNote(id!, entity);
    } else {
      const entity = new ParentNote({
        id: isNew ? 0 : id!,
        childName: d.childName.trim(),
        date,
        categories,
        content: d.content.trim(),
        nextSteps: d.nextSteps.trim(),
      });
      request$ = isNew
        ? this.parentApi.createNote(entity)
        : this.parentApi.updateNote(id!, entity);
    }

    request$.pipe(finalize(() => this._loading.set(false))).subscribe((saved) => {
      this.upsertNote(context, saved);
      this.selectNote(saved);
    });
  }

  deleteNote(id: number): void {
    const context = this._context();
    if (!context) return;

    this._loading.set(true);
    const request$ =
      context === 'institutional-teacher'
        ? this.institutionalApi.deleteNote(id)
        : context === 'personal-teacher'
          ? this.personalTeacherApi.deleteNote(id)
          : this.parentApi.deleteNote(id);

    request$.pipe(finalize(() => this._loading.set(false))).subscribe(() => {
      this.newNote();
      this.loadNotes();
    });
  }

  findNoteById(id: number): TrackedNote | undefined {
    return this.notes().find((n) => n.id === id);
  }

  noteDisplayName(note: TrackedNote): string {
    return note instanceof ParentNote ? note.childName : note.studentName;
  }

  categoryLabel(note: TrackedNote): string {
    return note.categories.length ? note.categories.join(' · ') : '';
  }

  canSaveDraft(): boolean {
    const context = this._context();
    if (!context) return false;
    return this.canSave(this._draft(), context);
  }

  private canSave(d: NotesDraft, context: NotesContext): boolean {
    if (context === 'personal-parent') {
      return Boolean(d.childName.trim() || d.content.trim());
    }
    return Boolean(d.studentName.trim() || d.content.trim());
  }

  private fetchForContext(context: NotesContext): Observable<TrackedNote[]> {
    switch (context) {
      case 'institutional-teacher':
        return this.institutionalApi.getNotes();
      case 'personal-teacher':
        return this.personalTeacherApi.getNotes();
      case 'personal-parent':
        return this.parentApi.getNotes();
    }
  }

  private setNotesForContext(context: NotesContext, rows: TrackedNote[]): void {
    switch (context) {
      case 'institutional-teacher':
        this._institutionalNotes.set(rows as TeacherInstitutionalNote[]);
        break;
      case 'personal-teacher':
        this._personalTeacherNotes.set(rows as TeacherPersonalNote[]);
        break;
      case 'personal-parent':
        this._parentNotes.set(rows as ParentNote[]);
        break;
    }
  }

  private upsertNote(context: NotesContext, saved: TrackedNote): void {
    const current = this.notes();
    const next = [...current.filter((n) => n.id !== saved.id), saved];
    next.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.setNotesForContext(context, next);
  }
}
