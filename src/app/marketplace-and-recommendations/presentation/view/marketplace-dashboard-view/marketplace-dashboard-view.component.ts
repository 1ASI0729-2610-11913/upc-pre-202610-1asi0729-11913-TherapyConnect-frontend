import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MarketplaceAndRecommendationsStore } from '../../../application/marketplace-and-recommendations-store';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductStatisticsComponent } from '../../components/product-statistics/product-statistics.component';
import { DashboardLayoutComponent } from '../../../../shared/presentation/layouts/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-marketplace-dashboard-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    DashboardLayoutComponent,
    ProductCardComponent,
    ProductStatisticsComponent,
  ],
  templateUrl: './marketplace-dashboard-view.component.html',
  styleUrl: './marketplace-dashboard-view.component.css',
})
export class MarketplaceDashboardViewComponent {
  private readonly store = inject(MarketplaceAndRecommendationsStore);

  protected readonly selectedCategory = signal('');
  protected readonly selectedType = signal('');
  protected readonly searchTerm = signal('');
  protected readonly sortOption = signal<'relevance' | 'name-asc' | 'name-desc'>('relevance');
  protected readonly currentPage = signal(1);
  protected readonly products = this.store.products;
  protected readonly pageSize = 6;

  protected readonly categories = computed(() => {
    const allCategories = this.products().map((product) => product.productCategory.trim());
    const uniqueCategories = Array.from(new Set(allCategories));
    return uniqueCategories.filter((category) => category.length > 0).sort();
  });

  protected readonly types = computed(() => {
    const allTypes = this.products().map((product) => product.productType.trim());
    const uniqueTypes = Array.from(new Set(allTypes));
    return uniqueTypes.filter((type) => type.length > 0).sort();
  });

  protected readonly recommendedProducts = computed(() =>
    this.products().filter((product) => product.recommendationState !== 'Not Implemented').length,
  );

  protected readonly filteredProducts = computed(() => {
    const category = this.selectedCategory().trim().toLowerCase();
    const type = this.selectedType().trim().toLowerCase();
    const query = this.searchTerm().trim().toLowerCase();

    return this.products().filter((product) => {
      const matchesCategory = category.length === 0 || product.productCategory.toLowerCase() === category;
      const matchesType = type.length === 0 || product.productType.toLowerCase() === type;

      if (query.length === 0) {
        return matchesCategory && matchesType;
      }

      const searchableText = [product.productName, product.productType, product.productCategory]
        .join(' ')
        .toLowerCase();

      return matchesCategory && matchesType && searchableText.includes(query);
    });
  });

  protected readonly sortedProducts = computed(() => {
    const items = [...this.filteredProducts()];
    const sort = this.sortOption();

    if (sort === 'name-asc') {
      return items.sort((a, b) => a.productName.localeCompare(b.productName));
    }

    if (sort === 'name-desc') {
      return items.sort((a, b) => b.productName.localeCompare(a.productName));
    }

    return items;
  });

  protected readonly featuredProducts = computed(() =>
    this.sortedProducts().filter((product) => product.recommendationState !== 'Not Implemented').slice(0, 2),
  );

  protected readonly profileProducts = computed(() => this.sortedProducts().slice(0, 4));

  protected readonly totalPages = computed(() => {
    const pages = Math.ceil(this.sortedProducts().length / this.pageSize);
    return pages > 0 ? pages : 1;
  });

  protected readonly pagedProducts = computed(() => {
    const page = this.currentPage();
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.sortedProducts().slice(start, end);
  });

  protected readonly paginationTokens = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 7) {
      return Array.from({ length: total }, (_, index) => index + 1);
    }

    if (current <= 4) {
      return [1, 2, 3, 4, 5, -1, total];
    }

    if (current >= total - 3) {
      return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, -1, current - 1, current, current + 1, -1, total];
  });

  protected updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  protected selectCategory(category: string): void {
    this.selectedCategory.set(category === this.selectedCategory() ? '' : category);
    this.currentPage.set(1);
  }

  protected selectType(type: string): void {
    this.selectedType.set(type === this.selectedType() ? '' : type);
    this.currentPage.set(1);
  }

  protected updateSort(value: 'relevance' | 'name-asc' | 'name-desc'): void {
    this.sortOption.set(value);
    this.currentPage.set(1);
  }

  protected clearFilters(): void {
    this.selectedCategory.set('');
    this.selectedType.set('');
    this.searchTerm.set('');
    this.sortOption.set('relevance');
    this.currentPage.set(1);
  }

  protected goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  protected conditionLabelForCategory(category: string): string {
    const normalized = category.trim().toLowerCase();

    if (normalized.includes('sensorial')) return 'Autismo';
    if (normalized.includes('comunicacion')) return 'TDAH';
    if (normalized.includes('cognitivo')) return 'Dislexia';

    return 'General';
  }
}
