import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface MarketplaceFilterValue {
  searchTerm: string;
  category: string;
}

@Component({
  selector: 'app-marketplace-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './marketplace-filter.component.html',
  styleUrls: ['./marketplace-filter.component.css']
})
export class MarketplaceFilterComponent {
  @Input() categories: string[] = [];

  @Output() filtersChange = new EventEmitter<MarketplaceFilterValue>();

  protected searchTerm = '';
  protected selectedCategory = '';

  protected emitChanges(): void {
    this.filtersChange.emit({
      searchTerm: this.searchTerm,
      category: this.selectedCategory,
    });
  }

  protected reset(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.emitChanges();
  }
}
