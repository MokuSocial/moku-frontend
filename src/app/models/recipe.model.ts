export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  ingredients: { name: string; quantity: string; }[];
  steps: string[];
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  createdAt: string; // ISO date string
  tags?: string[];
  likes?: number;
}