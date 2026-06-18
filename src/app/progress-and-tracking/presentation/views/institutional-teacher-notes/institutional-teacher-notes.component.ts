import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NotesStore } from '../../../application/notes.store';
import { DashboardLayoutComponent } from '../../../../shared/presentation/layouts/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-institutional-teacher-notes',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
    DatePipe,
  ],
  templateUrl: './institutional-teacher-notes.component.html',
  styleUrl: './institutional-teacher-notes.component.css',
})
export class InstitutionalTeacherNotesComponent implements OnInit {
  readonly store = inject(NotesStore);
  private readonly translate = inject(TranslateService);

  ngOnInit(): void {
    this.store.initContext('institutional-teacher');
  }

  deleteSelectedNote(): void {
    const id = this.store.selectedId();
    if (id == null) return;

    const message = this.translate.instant('notes.delete.confirmPrompt');
    if (confirm(message)) {
      this.store.deleteNote(id);
    }
  }
}
