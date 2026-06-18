import { Component, inject } from '@angular/core';
import { InterfaceRole } from '../../../../iam/domain/model/interface-role.enum';
import { AppNavigationContextService } from '../../../../shared/presentation/services/navigation/app-navigation-context.service';
import { ParentSessionHomeViewComponent } from '../parent-session-home-view/parent-session-home-view.component';
import { SessionHistoryViewComponent } from '../session-history-view/session-history-view.component';

@Component({
  selector: 'app-session-menu-view',
  standalone: true,
  imports: [ParentSessionHomeViewComponent, SessionHistoryViewComponent],
  templateUrl: './session-menu-view.component.html',
  styleUrl: './session-menu-view.component.css',
})
export class SessionMenuViewComponent {
  private readonly navigationContext = inject(AppNavigationContextService);

  protected readonly InterfaceRole = InterfaceRole;
  protected readonly context = this.navigationContext.context;
}
