import { Component, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationGroup } from '../../../domain/model/navigation-context.model';

@Component({
  selector: 'app-navigation-group',
  standalone: true,
  imports: [MatListModule, MatIconModule, TranslateModule],
  templateUrl: './navigation-group.component.html',
  styleUrl: './navigation-group.component.css',
})
export class NavigationGroupComponent {
  readonly group = input.required<NavigationGroup>();
}
