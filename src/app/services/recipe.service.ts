import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { environment } from 'src/environments/environment';
import { ApiResult, Recipe } from '../models/recipe.model';
import { generateApiResult, generateRecipe } from '../models/faker-data';

const BASE_URL = '';
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private http = inject(HttpClient);

  constructor() {}

  getRecipes(page = 1): Observable<ApiResult> {
    // Placeholder for actual API call
    return of(generateApiResult(1, 30)); // Replace with actual HTTP call
  }

  getRecipeById(id: string): Observable<Recipe> {
    // Placeholder for actual API call
    return of(generateRecipe()); // Replace with actual HTTP call
  }
}

const dummyRecipe: Recipe = {
  id: '1',
  title: 'Classic Pancakes',
  bannerUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  servings: 4,
  ingredients: [
    { name: 'Flour', quantity: 200, unit: 'g' },
    { name: 'Eggs', quantity: 2, unit: '' },
    { name: 'Milk', quantity: 300, unit: 'ml' },
    { name: 'Sugar', quantity: 50, unit: 'g' },
    { name: 'Salt', quantity: 1, unit: 'tsp' },
    { name: 'Butter', quantity: 30, unit: 'g' },
  ],
  indications: [
    { label: 'Cooking time', value: '15 min' },
    { label: 'Overall time', value: '25 min' },
    { label: 'Rest time', value: '5 min' },
  ],
  author: {
    id: 'u1',
    name: 'Jane Doe',
    avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  steps: [
    { text: 'Mix flour, sugar, and salt in a bowl.' },
    {
      text: 'Add eggs and milk, whisk until smooth.',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    },
    { text: 'Melt butter in a pan and pour batter.' },
    { text: 'Cook until golden, then flip and finish.' },
    {
      text: 'Serve hot with toppings of your choice.',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    },
  ],
  vote_average: 4.5,
};
