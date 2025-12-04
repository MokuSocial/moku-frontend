import { DecimalPipe, KeyValuePipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { InputChangeEventDetail, InputCustomEvent } from '@ionic/angular';
import {
  IonContent,
  IonInput,
  IonSpinner,
  IonText,
} from '@ionic/angular/standalone';
import { map } from 'rxjs/operators';

import { RecipeGQL, RecipeIngredient } from '../operations/recipe.generated';

@Component({
  selector: 'app-recipe',
  templateUrl: 'recipe.page.html',
  styleUrls: ['recipe.page.scss'],
  imports: [
    IonSpinner,
    IonText,
    IonInput,
    IonContent,
    FormsModule,
    KeyValuePipe,
    DecimalPipe,
  ],
})
export class RecipePage {
  private readonly recipeService = inject(RecipeGQL);

  public id = input.required<string>();
  public recipeResource = rxResource({
    params: () => {
      const idString = this.id();
      const idInt = Number.parseInt(idString, 10);
      return { id: Number.isNaN(idInt) ? 0 : idInt };
    },

    stream: ({ params }) =>
      this.recipeService
        .watch({ id: params.id })
        .valueChanges.pipe(map((result) => result.data?.recipe)),
  });

  public peopleCount = linkedSignal<number>(() => {
    const recipe = this.recipeResource.value();
    return recipe?.servings ?? 0;
  });

  public scaledIngredients = computed(() => {
    const localRecipe = this.recipeResource.value();
    const count = this.peopleCount();

    if (!localRecipe) return [];

    const baseServings = localRecipe.servings || 1;

    return localRecipe.ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: (ingredient.quantity * count) / baseServings,
    }));
  });

  public ingredientColumns = computed(() => {
    return this.splitIngredients(this.scaledIngredients(), 5);
  });

  public indications = computed(() => {
    const localIndications = this.recipeResource.value()?.indications;

    if (!localIndications) return [];

    const filteredIndications = {};
  });

  // --- Helpers & Events ---

  splitIngredients(ingredients: RecipeIngredient[], columnSize: number) {
    const columns = [];
    for (let i = 0; i < ingredients.length; i += columnSize) {
      columns.push(ingredients.slice(i, i + columnSize));
    }
    return columns;
  }

  onPeopleCountChange(event: InputCustomEvent<InputChangeEventDetail>) {
    const inputValue = event.target.value;

    if (typeof inputValue === 'number') {
      this.peopleCount.set(inputValue);
    } else if (inputValue) {
      this.peopleCount.set(Number.parseInt(inputValue, 10));
    }
  }

  mapIndications(key: string) {
    console.log(this.recipeResource.value()?.indications);
    const labels: Record<string, string> = {
      prepTime: 'Preparazione',
      cookTime: 'Cottura',
      difficulty: 'Difficoltà',
      restTime: 'Riposo',
    };
    return labels[key] || 'Label';
  }
}
