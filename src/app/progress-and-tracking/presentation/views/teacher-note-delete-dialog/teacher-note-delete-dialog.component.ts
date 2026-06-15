import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

export interface TeacherNoteDeleteDialogData {
  studentName: string;
  summaryLine: string;
}

@Component({
  selector: 'app-teacher-note-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, TranslateModule],
  templateUrl: './teacher-note-delete-dialog.component.html',
  styleUrl: './teacher-note-delete-dialog.component.css',
})
export class TeacherNoteDeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<TeacherNoteDeleteDialogComponent, boolean>);
  readonly data = inject<TeacherNoteDeleteDialogData>(MAT_DIALOG_DATA);

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
