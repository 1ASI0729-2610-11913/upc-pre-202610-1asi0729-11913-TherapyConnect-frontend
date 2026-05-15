import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InterfaceRole } from '../../../domain/model/interface-role.enum';
import { PlanType } from '../../../../shared/domain/model/plan-type.enum';
import { AppNavigationContextService } from '../../../../shared/presentation/services/navigation/app-navigation-context.service';
import { NavigationMenuService } from '../../../../shared/presentation/services/navigation/navigation-menu.service';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';

@Component({
  selector: 'app-plan-role-selector-view',
  standalone: true,
  imports: [AuthLayoutComponent, TranslateModule],
  templateUrl: './plan-role-selector-view.component.html',
  styleUrl: './plan-role-selector-view.component.css',
})
export class PlanRoleSelectorViewComponent {
  private readonly router = inject(Router);
  private readonly navigationContext = inject(AppNavigationContextService);
  private readonly navigationMenuService = inject(NavigationMenuService);

  protected readonly step = signal<1 | 2>(1);
  protected readonly selectedPlan = signal<PlanType | null>(null);

  protected selectPlan(plan: PlanType): void {
    this.selectedPlan.set(plan);
    this.step.set(2);
  }

  protected goBack(): void {
    this.step.set(1);
  }

  protected chooseRole(role: InterfaceRole): void {
    const plan = this.selectedPlan();
    if (!plan) {
      return;
    }
    this.navigationContext.setContext(plan, role);
    const segment = this.navigationMenuService.buildDashboardRouteSegment(plan, role);
    void this.router.navigate(['/app', segment]);
  }

  protected readonly PlanType = PlanType;
  protected readonly InterfaceRole = InterfaceRole;
}
