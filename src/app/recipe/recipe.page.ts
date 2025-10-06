import {
  Component,
  computed,
  inject,
  Input,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputChangeEventDetail, InputCustomEvent } from '@ionic/angular';
import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/angular/standalone';
import { Ingredient, Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: 'recipe.page.html',
  styleUrls: ['recipe.page.scss'],
  imports: [IonText, IonInput, IonLabel, IonItem, IonContent, FormsModule],
})
export class RecipePage {
  private readonly recipeService = inject(RecipeService);
  public recipe: WritableSignal<Recipe | null> = signal(null);
  public peopleCount: WritableSignal<number> = signal(
    this.recipe()?.servings ?? 0
  );
  public scaledIngredients: Signal<Ingredient[]> = computed(() => {
    const localRecipe = this.recipe();
    if (!localRecipe) return [];
    return localRecipe.ingredients.map((ingredient) => ({
      ...ingredient,
      quantity:
        (ingredient.quantity * this.peopleCount()) / localRecipe.servings,
    }));
  });

  public ingredientColumns: Signal<Ingredient[][]> = computed(() => {
    return this.splitIngredients(this.scaledIngredients(), 5);
  });

  @Input()
  set id(recipeId: string) {
    this.recipeService.getRecipeById(recipeId).subscribe((recipe) => {
      this.recipe.set(recipe);
      this.peopleCount.set(recipe.servings);
    });
  }

  splitIngredients(ingredients: Ingredient[], columnSize: number) {
    const columns = [];
    for (let i = 0; i < ingredients.length; i += columnSize) {
      columns.push(ingredients.slice(i, i + columnSize));
    }
    return columns;
  }

  onPeopleCountChange(event: InputCustomEvent<InputChangeEventDetail>) {
    const inputValue = event.target.value;
    if (typeof inputValue === 'number') this.peopleCount.set(inputValue);
    else
      this.peopleCount.update((value) =>
        inputValue ? parseInt(inputValue, 10) : value
      );
  }

  constructor() {}
}
