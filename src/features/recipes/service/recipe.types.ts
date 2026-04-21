export type RecipeAuthor = {
    name: string;
    surname: string;
};

export type PublicRecipe = {
    id: number;
    title: string;
    description: string;
    image: string;
    user: RecipeAuthor;
};

export type RecipesApiErrorPayload = {
    message?: string | string[];
    error?: string;
};