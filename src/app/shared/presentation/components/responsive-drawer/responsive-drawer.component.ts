import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-responsive-drawer',
  standalone: true,
  imports: [MatSidenavContainer, MatSidenav, MatSidenavContent],
  templateUrl: './responsive-drawer.component.html',
  styleUrl: './responsive-drawer.component.css',
})
export class ResponsiveDrawerComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly drawer = viewChild.required(MatSidenav);

  readonly isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(map((r) => r.matches)),
    { initialValue: false },
  );

  private readonly handsetOpened = signal(false);

  readonly drawerMode = computed(() => (this.isHandset() ? 'over' : 'side'));

  readonly drawerOpened = computed(() => !this.isHandset() || this.handsetOpened());

  constructor() {
    effect(() => {
      if (!this.isHandset()) {
        this.handsetOpened.set(true);
      } else {
        this.handsetOpened.set(false);
      }
    });
  }

  toggle(): void {
    void this.drawer().toggle();
  }

  closeIfHandset(): void {
    if (this.isHandset()) {
      this.handsetOpened.set(false);
    }
  }

  onDrawerOpenedChange(opened: boolean): void {
    if (this.isHandset()) {
      this.handsetOpened.set(opened);
    }
  }
}
