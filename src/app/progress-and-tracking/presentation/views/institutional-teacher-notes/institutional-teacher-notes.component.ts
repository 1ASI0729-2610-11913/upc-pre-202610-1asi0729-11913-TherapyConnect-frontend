import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { TeacherNotesStore } from '../../../application/teacher-notes.store';
import { TeacherNote } from '../../../domain/model/teacher-note.entity';
import {
  TeacherNoteDeleteDialogComponent,
  TeacherNoteDeleteDialogData,
} from '../teacher-note-delete-dialog/teacher-note-delete-dialog.component';
import { DashboardLayoutComponent } from '../../../../shared/presentation/layouts/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-institutional-teacher-notes',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    DatePipe,
  ],
  templateUrl: './institutional-teacher-notes.component.html',
  styleUrl: './institutional-teacher-notes.component.css',
})
export class InstitutionalTeacherNotesComponent implements OnInit {
  readonly store = inject(TeacherNotesStore);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.store.loadNotes();
  }

  openDeleteDialog(): void {
    const id = this.store.selectedId();
    if (id == null) {
      return;
    }
    const note = this.store.findNoteById(id);
    if (!note) {
      return;
    }

    const data: TeacherNoteDeleteDialogData = {
      studentName: note.studentName || '—',
      summaryLine: this.buildSummaryLine(note),
    };

    const ref = this.dialog.open(TeacherNoteDeleteDialogComponent, {
      width: '360px',
      data,
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.store.deleteNote(id);
      }
    });
  }

  private buildSummaryLine(note: TeacherNote): string {
    const date = new Date(note.date);
    const dateStr = date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const cats = note.categories.length ? note.categories.join(' · ') : '—';
    return `${dateStr} · ${cats}`;
  }
}
