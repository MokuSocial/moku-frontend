export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Author = {
  __typename?: 'Author';
  avatarUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Indication = {
  __typename?: 'Indication';
  cookTime: Scalars['Int']['output'];
  difficulty: Scalars['String']['output'];
  prepTime: Scalars['Int']['output'];
  restTime?: Maybe<Scalars['Int']['output']>;
};

export type IntConnection = {
  __typename?: 'IntConnection';
  /** A list of edges. */
  edges: Array<IntEdge>;
  /** A list of nodes. */
  nodes: Array<Scalars['Int']['output']>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type IntEdge = {
  __typename?: 'IntEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Scalars['Int']['output'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  expiresIn?: Maybe<Scalars['Int']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

/** Information about pagination in a connection */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
  numbers: IntConnection;
  recipe?: Maybe<Recipe>;
  recipes: RecipeConnection;
};


export type QueryHelloArgs = {
  name: Scalars['String']['input'];
};


export type QueryNumbersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRecipeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRecipesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type Recipe = {
  __typename?: 'Recipe';
  author: Author;
  bannerUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  indications: Indication;
  ingredients: Array<RecipeIngredient>;
  servings: Scalars['Int']['output'];
  steps: Array<Step>;
  title: Scalars['String']['output'];
  voteAverage: Scalars['Float']['output'];
  votes: Scalars['Int']['output'];
};

export type RecipeConnection = {
  __typename?: 'RecipeConnection';
  /** A list of edges. */
  edges: Array<RecipeEdge>;
  /** A list of nodes. */
  nodes: Array<Recipe>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type RecipeEdge = {
  __typename?: 'RecipeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Recipe;
};

export type RecipeIngredient = {
  __typename?: 'RecipeIngredient';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
  unit?: Maybe<Scalars['String']['output']>;
};

export type Step = {
  __typename?: 'Step';
  description: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  stepNumber: Scalars['Int']['output'];
};
