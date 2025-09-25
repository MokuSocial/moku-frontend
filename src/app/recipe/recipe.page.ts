import { Component, OnInit } from '@angular/core';
import { InputCustomEvent, InputChangeEventDetail } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Ingredient, Recipe } from '../models/recipe.model';
import { FormsModule } from '@angular/forms';


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
  recipe: Recipe = {
    id: '1',
    title: 'Classic Pancakes',
    description: 'Fluffy pancakes for a perfect breakfast.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    servings: 4,
    ingredients: [
      { name: 'Flour', quantity: 200, unit: 'g' },
      { name: 'Eggs', quantity: 2, unit: '' },
      { name: 'Milk', quantity: 300, unit: 'ml' },
      { name: 'Sugar', quantity: 50, unit: 'g' },
      { name: 'Salt', quantity: 1, unit: 'tsp' },
      { name: 'Butter', quantity: 30, unit: 'g' },
    ],
    author: {
      id: 'u1',
      name: 'Jane Doe',
      avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    createdAt: '2025-09-25T10:00:00Z',
    tags: ['breakfast', 'easy', 'sweet'],
    steps: [
      { text: 'Mix flour, sugar, and salt in a bowl.' },
      { text: 'Add eggs and milk, whisk until smooth.' },
      { text: 'Melt butter in a pan and pour batter.' },
      { text: 'Cook until golden, then flip and finish.' },
      { text: 'Serve hot with toppings of your choice.' },
    ],
  };

  peopleCount: number = this.recipe.servings;

  ingredientColumns: Ingredient[][] = [];

  ngOnInit() {
    this.ingredientColumns = this.splitIngredients(this.recipe.ingredients, 5);
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
