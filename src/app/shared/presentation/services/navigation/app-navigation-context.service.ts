import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationContext } from '../../../domain/model/navigation-context.model';
import { InterfaceRole } from '../../../../iam/domain/model/interface-role.enum';
import { PlanType } from '../../../domain/model/plan-type.enum';
import { NavigationMenuService } from './navigation-menu.service';

const STORAGE_KEY = 'tc_nav_context';

@Injectable({ providedIn: 'root' })
export class AppNavigationContextService {
  private readonly navigationMenuService = inject(NavigationMenuService);
  private readonly contextSignal = signal<NavigationContext | null>(null);

  readonly context = this.contextSignal.asReadonly();

  readonly menuGroups = computed(() => {
    const ctx = this.contextSignal();
    if (!ctx) {
      return [];
    }
    return this.navigationMenuService.buildNavigationGroups(ctx.plan, ctx.role);
  });

  readonly dashboardSegment = computed(() => {
    const ctx = this.contextSignal();
    if (!ctx) {
      return 'personal-parent-dashboard';
    }
    return this.navigationMenuService.buildDashboardRouteSegment(ctx.plan, ctx.role);
  });

  hydrateFromSession(): void {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    try {
      const parsed = JSON.parse(raw) as NavigationContext;
      if (parsed?.plan && parsed?.role) {
        this.contextSignal.set(parsed);
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }

  setContext(plan: PlanType, role: InterfaceRole): void {
    const value: NavigationContext = { plan, role };
    this.contextSignal.set(value);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }

  clearContext(): void {
    this.contextSignal.set(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  hasContext(): boolean {
    return this.contextSignal() !== null;
  }
}
