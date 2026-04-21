export type IngredientFormValue = {
    id: string;
    name: string;
    amount: string;
    unit: string;
};

export type CreateRecipeFormValues = {
    title: string;
    description: string;
    imageFile: File | null;
    ingredients: IngredientFormValue[];
};

export type CreateRecipeRequest = {
    title: string;
    description: string;
    ingredients: Array<{
        name: string;
        amount: number;
        unit: string;
    }>;
};

export type RecipeWithIngredientsResponse = {
    title: string;
    description: string;
    image: string;
    ingredients: Array<{
        name: string;
        amount: number;
        unit: string;
    }>;
};

export type RecipeApiError = {
    message?: string | string[];
    error?: string;
};
