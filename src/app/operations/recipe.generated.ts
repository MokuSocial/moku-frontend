import * as Types from '../../types.generated';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type RecipesQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type RecipesQuery = { __typename?: 'Query', recipes: { __typename?: 'RecipeConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, nodes: Array<{ __typename?: 'Recipe', id: number, title: string, bannerUrl?: string | null, voteAverage: number, author: { __typename?: 'Author', name: string } }> } };

export type RecipeQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type RecipeQuery = { __typename?: 'Query', recipe?: { __typename?: 'Recipe', id: number, title: string, bannerUrl?: string | null, servings: number, voteAverage: number, ingredients: Array<{ __typename?: 'RecipeIngredient', id: number, name: string, unit?: string | null, quantity: number }>, indications: { __typename?: 'Indication', prepTime: number, cookTime: number, restTime?: number | null, difficulty: string }, steps: Array<{ __typename?: 'Step', stepNumber: number, description: string, imageUrl?: string | null }>, author: { __typename?: 'Author', name: string, avatarUrl: string } } | null };

export const RecipesDocument = gql`
    query Recipes($first: Int, $after: String) {
  recipes(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      title
      bannerUrl
      voteAverage
      author {
        name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RecipesGQL extends Apollo.Query<RecipesQuery, RecipesQueryVariables> {
    document = RecipesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RecipeDocument = gql`
    query Recipe($id: Int!) {
  recipe(id: $id) {
    id
    title
    bannerUrl
    servings
    voteAverage
    ingredients {
      id
      name
      unit
      quantity
    }
    indications {
      prepTime
      cookTime
      restTime
      difficulty
    }
    steps {
      stepNumber
      description
      imageUrl
    }
    author {
      name
      avatarUrl
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RecipeGQL extends Apollo.Query<RecipeQuery, RecipeQueryVariables> {
    document = RecipeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }