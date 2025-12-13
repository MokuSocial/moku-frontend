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
import { ImgFallbackDirective } from '../directives/img-fallback';
import { RecipesGQL } from '../operations/recipe.generated';
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
    ImgFallbackDirective,
  ],
})
export class HomePage {
  private readonly recipesService = inject(RecipesGQL);
  private readonly PAGE_SIZE = 3;

  private readonly queryRef = this.recipesService.watch({
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

    if (!pageInfo?.hasNextPage || !pageInfo.endCursor) {
      event.target.disabled = true;
      event.target.complete();
      return;
    }

    try {
      await this.queryRef.fetchMore({
        variables: {
          first: this.PAGE_SIZE,
          after: pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return {
            recipes: {
              __typename: prev.recipes.__typename,
              pageInfo: fetchMoreResult.recipes.pageInfo,
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
