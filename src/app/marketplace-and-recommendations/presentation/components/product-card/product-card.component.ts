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
  @Input() productName: string = '';
  @Input() conditionTag: string = '';
  @Input() productType: string = '';
  @Input() productCategory: string = '';
  @Input() availabilityState: string = '';
  @Input() availableQuantity: number = 0;
  @Input() featured: boolean = false;

  protected get isAvailable(): boolean {
    return this.availabilityState === 'Available' && this.availableQuantity > 0;
  }
}
