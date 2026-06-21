import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceAndRecommendationsStore } from '../../../application/marketplace-and-recommendations-store';

@Component({
  selector: 'app-marketplace-detail-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marketplace-detail-view.component.html',
  styleUrls: ['./marketplace-detail-view.component.css']
})
export class MarketplaceDetailViewComponent {
  private readonly store = inject(MarketplaceAndRecommendationsStore);

  protected readonly product = computed(() => {
    const sel = this.store.selectedProduct();
    if (!sel) {
      return {
        title: 'Product not found',
        description: 'No description available.',
        category: 'Unknown',
        image: 'https://placehold.co/600x400',
        rating: 0,
        stock: 0,
        price: 0,
        availability: 'Out of Stock'
      };
    }

    return {
      title: sel.productName ?? 'Untitled',
      description: sel.productType ?? '',
      category: sel.productCategory ?? 'General',
      image: 'https://placehold.co/600x400',
      rating: 0,
      stock: sel.availableQuantity ?? 0,
      price: 0,
      availability: sel.availabilityState ?? 'Out of Stock'
    };
  });

  protected readonly availability = computed(() =>
    this.product().stock > 0 && this.product().availability === 'Available' ? 'Available' : 'Out of Stock'
  );
}
