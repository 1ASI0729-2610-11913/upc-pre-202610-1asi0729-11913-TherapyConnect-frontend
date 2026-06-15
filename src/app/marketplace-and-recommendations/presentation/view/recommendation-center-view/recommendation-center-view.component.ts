import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecommendationCardComponent }
  from '../../components/recommendation-card/recommendation-card.component';

@Component({
  selector: 'app-recommendation-center-view',
  standalone: true,
  imports: [
    CommonModule,
    RecommendationCardComponent
  ],
  templateUrl: './recommendation-center-view.component.html',
  styleUrls: ['./recommendation-center-view.component.css']
})
export class RecommendationCenterViewComponent {

  protected readonly recommendations = signal([
    {
      id: 1,
      title: 'Advanced Speech Exercises',
      reason: 'Based on recent therapy sessions and communication progress.',
      matchPercentage: 92,
      category: 'Speech Therapy'
    },
    {
      id: 2,
      title: 'Behavioral Reinforcement Kit',
      reason: 'Recommended for emotional development and learning habits.',
      matchPercentage: 88,
      category: 'Psychology'
    },
    {
      id: 3,
      title: 'Interactive Learning Board',
      reason: 'Suggested to improve attention and sensory stimulation.',
      matchPercentage: 84,
      category: 'Occupational Therapy'
    }
  ]);

  protected readonly totalRecommendations = computed(() =>
    this.recommendations().length
  );

  protected readonly averageMatch = computed(() => {

    const items = this.recommendations();

    if (items.length === 0) {
      return 0;
    }

    const total =
      items.reduce(
        (sum, item) => sum + item.matchPercentage,
        0
      );

    return Math.round(total / items.length);
  });
}
