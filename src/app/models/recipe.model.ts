export interface ApiResult {
  page: number;
  results: Recipe[];
  total_pages: number;
  total_results: number;
}

export interface Recipe {
  id: number;
  title: string;
  bannerUrl: string;
  servings: number;
  ingredients: Ingredient[];
  indications: {
    // in minutes
    prepTime: number;
    cookTime: number;
    restTime?: number;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  steps: RecipeStep[];
  author: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  voteAverage: number;
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface RecipeStep {
  text: string;
  imageUrl?: string;
}
