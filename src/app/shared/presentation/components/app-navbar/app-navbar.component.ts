import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { NotificationButtonComponent } from '../notification-button/notification-button.component';
import { UserProfileChipComponent } from '../user-profile-chip/user-profile-chip.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TranslateModule,
    LanguageSwitcherComponent,
    NotificationButtonComponent,
    UserProfileChipComponent,
  ],
  templateUrl: './app-navbar.component.html',
  styleUrl: './app-navbar.component.css',
})
export class AppNavbarComponent {
  readonly menuToggle = output<void>();

  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(map((r) => r.matches)),
    { initialValue: false },
  );
}
