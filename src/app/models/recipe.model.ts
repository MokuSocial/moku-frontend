export interface ApiResult {
  page: number;
  results: Recipe[];
  total_pages: number;
  total_results: number;
}

export interface Recipe {
  id: string;
  title: string;
  bannerUrl: string;
  servings: number;
  ingredients: Ingredient[];
  indications: Indication[];
  steps: RecipeStep[];
  author: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  vote_average: number;
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Indication {
  label: string;
  value: string;
}

export interface RecipeStep {
  text: string;
  imageUrl?: string;
}
