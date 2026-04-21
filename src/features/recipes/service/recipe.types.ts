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

export type RecipeRating = {
    score: number;
    comment: string;
    user: RecipeAuthor;
};

export type RecipesApiErrorPayload = {
    message?: string | string[];
    error?: string;
};