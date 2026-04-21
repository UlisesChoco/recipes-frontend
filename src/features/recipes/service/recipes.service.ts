import type { CreateRecipeRequest, RecipeWithIngredientsResponse } from "./create-recipe.types";
import type {
    MyRecipe,
    PublicRecipe,
    RecipeDetails,
    RecipeRating,
    RecipesApiErrorPayload,
} from "./recipe.types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

function normalizeApiError(status: number, data: RecipesApiErrorPayload | null): string {
    if (data?.message) {
        return Array.isArray(data.message) ? data.message.join(". ") : data.message;
    }

    if (data?.error) {
        return data.error;
    }

    return `Request failed with status ${status}`;
}

export function buildRecipeImageSrc(imageName: string): string {
    return `${API_BASE_URL}/uploads/${imageName}`;
}

export async function getPublicRecipes(token: string): Promise<PublicRecipe[]> {
    const response = await fetch(`${API_BASE_URL}/recipes`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        let payload: RecipesApiErrorPayload | null = null;

        try {
            payload = (await response.json()) as RecipesApiErrorPayload;
        } catch {
            payload = null;
        }

        throw new Error(normalizeApiError(response.status, payload));
    }

    return (await response.json()) as PublicRecipe[];
}

export async function getMyRecipes(token: string): Promise<MyRecipe[]> {
    const response = await fetch(`${API_BASE_URL}/recipes/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        let payload: RecipesApiErrorPayload | null = null;

        try {
            payload = (await response.json()) as RecipesApiErrorPayload;
        } catch {
            payload = null;
        }

        throw new Error(normalizeApiError(response.status, payload));
    }

    return (await response.json()) as MyRecipe[];
}

export async function getRecipeById(token: string, recipeId: number): Promise<RecipeDetails> {
    const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        let payload: RecipesApiErrorPayload | null = null;

        try {
            payload = (await response.json()) as RecipesApiErrorPayload;
        } catch {
            payload = null;
        }

        throw new Error(normalizeApiError(response.status, payload));
    }

    return (await response.json()) as RecipeDetails;
}

export async function getRecipeRatings(token: string, recipeId: number): Promise<RecipeRating[]> {
    const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}/ratings`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        let payload: RecipesApiErrorPayload | null = null;

        try {
            payload = (await response.json()) as RecipesApiErrorPayload;
        } catch {
            payload = null;
        }

        throw new Error(normalizeApiError(response.status, payload));
    }

    return (await response.json()) as RecipeRating[];
}

export async function updateRecipe(
    token: string,
    recipeId: number,
    payload: CreateRecipeRequest,
    imageFile?: File | null
): Promise<RecipeWithIngredientsResponse> {
    const formData = new FormData();

    if (imageFile) {
        formData.append("image", imageFile);
    }

    formData.append("data", JSON.stringify(payload));

    const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        let payload: RecipesApiErrorPayload | null = null;

        try {
            payload = (await response.json()) as RecipesApiErrorPayload;
        } catch {
            payload = null;
        }

        throw new Error(normalizeApiError(response.status, payload));
    }

    return (await response.json()) as RecipeWithIngredientsResponse;
}

export async function deleteRecipe(token: string, recipeId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        let payload: RecipesApiErrorPayload | null = null;

        try {
            payload = (await response.json()) as RecipesApiErrorPayload;
        } catch {
            payload = null;
        }

        throw new Error(normalizeApiError(response.status, payload));
    }
}