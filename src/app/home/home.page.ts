import { Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import {
  InfiniteScrollCustomEvent,
  IonAlert,
  IonAvatar,
  IonCard,
  IonContent,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonList,
  IonSkeletonText,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, starHalf, starOutline } from 'ionicons/icons';
import { map } from 'rxjs/operators';

// Generated Imports
import { RecipesGQL, RecipesQuery } from '../operations/recipe.generated';
import { range } from '../utils';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonAlert,
    IonSkeletonText,
    IonAvatar,
    IonList,
    IonItem,
    IonImg,
    IonIcon,
    IonContent,
    RouterModule,
    IonCard,
    IonText,
  ],
})
export class HomePage {
  private readonly recipesService = inject(RecipesGQL);
  private readonly PAGE_SIZE = 10;

  private queryRef = this.recipesService.watch({
    first: this.PAGE_SIZE,
    after: null,
  });

  public recipesResource = rxResource({
    stream: () => this.queryRef.valueChanges.pipe(map((res) => res.data)),
  });

  public recipes = computed(() => {
    return this.recipesResource.value()?.recipes?.nodes ?? [];
  });

  constructor() {
    addIcons({ star, starHalf, starOutline });
  }

  /**
   * Infinite Scroll Logic
   */
  async loadMore(event: InfiniteScrollCustomEvent) {
    const currentData = this.recipesResource.value();
    const pageInfo = currentData?.recipes?.pageInfo;

    // Check if there are more pages
    if (!pageInfo?.hasNextPage || !pageInfo.endCursor) {
      event.target.disabled = true;
      event.target.complete();
      return;
    }

    try {
      // 4. Apollo Fetch More (Cursor Pagination)
      await this.queryRef.fetchMore({
        variables: {
          first: this.PAGE_SIZE,
          after: pageInfo.endCursor, // Pass the last cursor
        },
        // 5. Update Query Logic: Merge the new items with existing items
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return {
            recipes: {
              __typename: prev.recipes.__typename,
              // Merge PageInfo (take the new one)
              pageInfo: fetchMoreResult.recipes.pageInfo,
              // Merge Edges (optional, but good practice)
              edges: [
                ...(prev.recipes.edges || []),
                ...(fetchMoreResult.recipes.edges || []),
              ],
              // Merge Nodes (The actual data we display)
              nodes: [
                ...(prev.recipes.nodes || []),
                ...(fetchMoreResult.recipes.nodes || []),
              ],
            },
          };
        },
      });
    } catch (err) {
      console.error('Error loading more recipes', err);
    } finally {
      // Always complete the Ionic event
      event.target.complete();
    }
  }

  // --- UI Helpers ---

  protected readonly range = range;

  getStars(vote = 0): string[] {
    const stars: string[] = [];
    const rating = Math.round(vote * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('star');
      } else if (i - 0.5 === rating) {
        stars.push('star-half');
      } else {
        stars.push('star-outline');
      }
    }
    return stars;
  }
}
