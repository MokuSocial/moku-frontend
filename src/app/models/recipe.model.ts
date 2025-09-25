export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  servings: number;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  createdAt: string; // ISO date string
  tags?: string[];
  likes?: number;
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