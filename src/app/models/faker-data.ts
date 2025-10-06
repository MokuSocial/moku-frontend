import { faker } from '@faker-js/faker';
import {
  ApiResult,
  Recipe,
  Ingredient,
  Indication,
  RecipeStep,
} from './recipe.model';

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

function generateIndication(): Indication {
  return {
    label: faker.lorem.word(),
    value: faker.lorem.word(),
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
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    bannerUrl: faker.image.urlPicsumPhotos({
      width: 1280,
      height: 960,
      blur: 0,
      grayscale: false,
    }),
    servings: faker.number.int({ min: 2, max: 4 }),
    ingredients: Array.from(
      { length: faker.number.int({ min: 20, max: 20 }) },
      generateIngredient
    ),
    indications: Array.from(
      { length: faker.number.int({ min: 3, max: 3 }) },
      generateIndication
    ),
    steps: Array.from(
      { length: faker.number.int({ min: 5, max: 10 }) },
      generateStep
    ),
    author: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
    },
    vote_average: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
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
