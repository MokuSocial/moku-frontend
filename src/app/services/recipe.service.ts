import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Recipe } from '../models/recipe.model';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

const BASE_URL = 'https://api.themoviedb.org/3';
// const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);

  constructor() {}

  getRecipes(): Observable<Recipe[]> {
    // Placeholder for actual API call
    return of([]); // Replace with actual HTTP call
  }

  getRecipeById(id: string): Observable<Recipe> {
    // Placeholder for actual API call
    return of(dummyRecipe); // Replace with actual HTTP call
  }
}


const dummyRecipe: Recipe = {
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