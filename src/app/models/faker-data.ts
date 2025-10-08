import { faker } from '@faker-js/faker';
import { ApiResult, Recipe, Ingredient, RecipeStep } from './recipe.model';

function generateIngredient(): Ingredient {
  return {
    name: faker.commerce.product(),
    quantity: faker.number.int({ min: 1, max: 500 }),
    unit: faker.helpers.arrayElement([
      'g',
      'kg',
      'ml',
      'l',
      'tbsp',
      'tsp',
      'cup',
    ]),
  };
}

function generateStep(): RecipeStep {
  return {
    text: faker.lorem.sentences({ min: 1, max: 3 }),
    imageUrl: faker.datatype.boolean()
      ? faker.image.urlPicsumPhotos({
          width: 640,
          height: 480,
          blur: 0,
          grayscale: false,
        })
      : undefined,
  };
}

export function generateRecipe(): Recipe {
  return {
    id: faker.number.int(),
    title: faker.commerce.productName(),
    bannerUrl: faker.image.urlPicsumPhotos({
      width: 1280,
      height: 960,
      blur: 0,
      grayscale: false,
    }),
    servings: faker.number.int({ min: 2, max: 4 }),
    ingredients: Array.from(
      { length: faker.number.int({ min: 7, max: 10 }) },
      generateIngredient
    ),
    indications: {
      prepTime: faker.number.int({ min: 5, max: 15 }),
      cookTime: faker.number.int({ min: 10, max: 30 }),
      difficulty: faker.string.fromCharacters(['easy', 'medium', 'hard']) as
        | 'easy'
        | 'medium'
        | 'hard',
      restTime: faker.number.int({ min: 30, max: 60 }),
    },
    steps: Array.from(
      { length: faker.number.int({ min: 5, max: 10 }) },
      generateStep
    ),
    author: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
    },
    voteAverage: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
  };
}

export function generateApiResult(page = 1, perPage = 10): ApiResult {
  const results = Array.from({ length: perPage }, generateRecipe);

  return {
    page,
    results,
    total_pages: 5,
    total_results: perPage * 5,
  };
}
