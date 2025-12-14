import { DecimalPipe } from '@angular/common';
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

import { RecipeGQL } from '../operations/recipe.generated';
import { ImgFallbackDirective } from '../directives/img-fallback';
import { RecipeIngredient } from 'src/types.generated';

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
    DecimalPipe,
    ImgFallbackDirective,
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

  private readonly indicationFields = [
    { key: 'prepTime', label: 'Preparazione', unit: 'min' },
    { key: 'cookTime', label: 'Cottura', unit: 'min' },
    { key: 'restTime', label: 'Riposo', unit: 'min' },
    { key: 'difficulty', label: 'Difficoltà', unit: '' },
  ] as const;

  public indicationList = computed(() => {
    const localIndications = this.recipeResource.value()?.indications;

    if (!localIndications) return [];
    return this.indicationFields
      .map((field) => {
        return {
          label: field.label,
          value: localIndications[field.key],
          unit: field.unit,
        };
      })
      .filter(
        (item) =>
          item.value != null && item.value != undefined && item.value != 0
      );
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
}
