import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-marketplace-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './marketplace-filter.component.html',
  styleUrls: ['./marketplace-filter.component.css']
})
export class MarketplaceFilterComponent {
  protected category: string = 'All';

  @Output() categoryChange = new EventEmitter<string>();

  protected categories = [
    'All',
    'Speech Therapy',
    'Psychology',
    'Occupational Therapy'
  ];

  protected applyFilter() {
    this.categoryChange.emit(this.category);
  }
}
