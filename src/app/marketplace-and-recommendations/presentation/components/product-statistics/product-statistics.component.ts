import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-statistics.component.html',
  styleUrls: ['./product-statistics.component.css']
})
export class ProductStatisticsComponent {
  @Input() totalProducts: number = 0;
  @Input() recommendedProducts: number = 0;
  @Input() activeCategories: number = 0;
}
