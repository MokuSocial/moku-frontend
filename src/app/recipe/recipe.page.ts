import { Component, computed, inject, Input, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { InputCustomEvent, InputChangeEventDetail } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Ingredient, Recipe } from '../models/recipe.model';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';


@Component({
  selector: 'app-recipe',
  templateUrl: 'recipe.page.html',
  styleUrls: ['recipe.page.scss'],
  imports: [
    IonInput,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
    ExploreContainerComponent,
  ],
})
export class RecipePage implements OnInit {
  private recipeService = inject(RecipeService);
  public recipe: WritableSignal<Recipe | null> = signal(null);
  public peopleCount: Signal<number> = computed(() => this.recipe()?.servings ?? 0 * 2);

  
  @Input()
  set id(recipeId: string) {
    this.recipeService.getRecipeById(recipeId).subscribe((recipe) => {
      this.recipe.set(recipe);
    });
  }

  

  ingredientColumns: Ingredient[][] = [];

  ngOnInit() {
    this.getRecipeById("sa");
  }

  async getRecipeById(id: string) {
    this.recipeService.getRecipeById(id).subscribe((recipe) => {
      this.recipe = recipe;
      this.peopleCount = this.recipe.servings;
      this.ingredientColumns = this.splitIngredients(this.recipe.ingredients, 5);
    });
  }

  get scaledIngredients(): Ingredient[] {
    const test = this.recipe.ingredients.map((ingredient) => ({
      ...ingredient,
      quantity:
        (ingredient.quantity * this.peopleCount) / this.recipe.servings,
    }));
    console.log('Scaled Ingredients:', test); 
    return test;
  }

  splitIngredients(ingredients: Ingredient[], columnSize: number) {
    const columns = [];
    for (let i = 0; i < ingredients.length; i += columnSize) {
      columns.push(ingredients.slice(i, i + columnSize));
    }
    return columns;
  }

  onPeopleCountChange(event: InputCustomEvent<InputChangeEventDetail>) {
    // This can be empty if you use the getter above, or use to trigger recalculation
    const inputValue = event.target.value;
    console.log('People count changed:', inputValue);
    if (typeof inputValue === 'number') this.peopleCount = inputValue;
    else
      this.peopleCount = inputValue
        ? parseInt(inputValue, 10)
        : this.peopleCount;
  }

  constructor() {}
}
