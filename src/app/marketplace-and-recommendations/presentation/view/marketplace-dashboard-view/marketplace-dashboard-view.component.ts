import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceAndRecommendationsStore } from '../../../application/marketplace-and-recommendations-store';

import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductStatisticsComponent } from '../../components/product-statistics/product-statistics.component';
import { MarketplaceFilterComponent } from '../../components/marketplace-filter/marketplace-filter.component';

@Component({
  selector: 'app-marketplace-dashboard-view',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    ProductStatisticsComponent,
    MarketplaceFilterComponent
  ],
  templateUrl: './marketplace-dashboard-view.component.html',
  styleUrls: ['./marketplace-dashboard-view.component.css']
})
export class MarketplaceDashboardViewComponent {
  private readonly store = inject(MarketplaceAndRecommendationsStore);

  protected readonly selectedCategory = signal('All');

  protected readonly products = computed(() =>
    this.store.products().map(p => ({
      id: p.id,
      title: p.productName,
      description: p.productType,
      category: p.productCategory,
      price: 0,
      image: 'https://placehold.co/600x400',
      rating: 0
    }))
  );

  protected readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();

    if (category === 'All') return this.products();

    return this.products().filter(p => p.category === category);
  });

  protected updateCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
