import { Component, inject } from '@angular/core';
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
import { catchError, finalize } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { range } from '../utils';

import { addIcons } from 'ionicons';
import { star, starHalf, starOutline } from 'ionicons/icons';

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
  private recipeService = inject(RecipeService);
  private currentPage: number = 1;
  public error = null;
  public isLoading = false;
  public recipes: Recipe[] = [];
  public dummyArray = new Array(5);

  id = 1;
  constructor() {
    this.loadRecipes();
    addIcons({ star, starHalf, starOutline });
  }

  range = range;

  loadRecipes(event?: InfiniteScrollCustomEvent) {
    this.error = null;

    // Only show loading indicator on initial load
    if (!event) {
      this.isLoading = true;
    }

    // Get the next page of recipes from the RecipeService
    this.recipeService
      .getRecipes(this.currentPage)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((err: any) => {
          this.error = err.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          // Append the results to our recipes array
          this.recipes.push(...res.results);

          // Resolve the infinite scroll promise to tell Ionic that we are done
          event?.target.complete();

          // Disable the infinite scroll when we reach the end of the list
          if (event) {
            event.target.disabled = res.total_pages === this.currentPage;
          }
        },
      });
  }

  // This method is called by the infinite scroll event handler
  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadRecipes(event);
  }

  getStars(vote: number): string[] {
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
