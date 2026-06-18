import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recommendation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendation-card.component.html',
  styleUrls: ['./recommendation-card.component.css']
})
export class RecommendationCardComponent {
  @Input() title: string = '';
  @Input() reason: string = '';
  @Input() matchPercentage: number = 0;
}
