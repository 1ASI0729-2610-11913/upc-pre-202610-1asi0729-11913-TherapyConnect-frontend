import { Component } from '@angular/core';
import { PageContainerComponent } from '../../components/page-container/page-container.component';
import { ResponsiveLayoutComponent } from '../responsive-layout/responsive-layout.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [ResponsiveLayoutComponent, PageContainerComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {}
