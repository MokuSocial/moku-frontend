import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  InfiniteScrollCustomEvent,
  IonAlert,
  IonAvatar,
  IonBadge,
  IonContent,
  IonHeader,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { catchError, finalize } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { range } from '../utils';

@Component({
  selector: 'app-home',
  templateUrl: 'home2.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonBadge,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonLabel,
    IonAlert,
    IonSkeletonText,
    IonAvatar,
    IonList,
    IonItem,
    IonImg,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    RouterModule,
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
  }

  range = range;

  loadRecipes(event?: InfiniteScrollCustomEvent) {
    this.error = null;

    // Only show loading indicator on initial load
    if (!event) {
      this.isLoading = true;
    }

    // Get the next page of movies from the MovieService
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
          // Append the results to our movies array
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
}
