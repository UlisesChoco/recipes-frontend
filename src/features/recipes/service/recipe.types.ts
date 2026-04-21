export type RecipeAuthor = {
    name: string;
    surname: string;
};

export type RecipeIngredient = {
    name: string;
    amount: number;
    unit: string;
};

export type PublicRecipe = {
    id: number;
    title: string;
    description: string;
    image: string;
    user: RecipeAuthor;
};

export type MyRecipe = {
    id: number;
    title: string;
    description: string;
    image: string;
};

export type RecipeDetails = {
    id: number;
    title: string;
    description: string;
    image: string;
    user: RecipeAuthor;
    ingredients: RecipeIngredient[];
};

export type PublicRecipeDetails = {
    id: number;
    title: string;
    description: string;
    image: string;
    user: RecipeAuthor;
    ingredients: RecipeIngredient[];
};

export type RecipeRating = {
    score: number;
    comment: string;
    user: RecipeAuthor;
};

export type CreateRecipeRatingRequest = {
    score: number;
    comment: string;
    recipeId: number;
};

export type CreateRecipeRatingResponse = {
    score: number;
    comment: string;
};

export type RecipesApiErrorPayload = {
    message?: string | string[];
    error?: string;
};