import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() category: string = '';
  @Input() price: number = 0;
  @Input() image: string = '';
  @Input() rating: number = 0;
}
