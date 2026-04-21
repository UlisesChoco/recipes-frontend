import { getAuthToken } from "../../auth/service/auth-token.storage";
import type { CreateRecipeRequest, RecipeWithIngredientsResponse, RecipeApiError } from "./create-recipe.types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

function normalizeApiError(status: number, data: RecipeApiError | null): string {
    if (data?.message) {
        return Array.isArray(data.message) ? data.message.join(". ") : data.message;
    }

    if (data?.error) {
        return data.error;
    }

    return `Request failed with status ${status}`;
}

export async function createRecipe(
    payload: CreateRecipeRequest,
    imageFile: File
): Promise<RecipeWithIngredientsResponse> {
    const token = getAuthToken();

    if (!token) {
        throw new Error("No hay una sesion activa para crear la receta.");
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("data", JSON.stringify(payload));

    const response = await fetch(`${API_BASE_URL}/recipes`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        let payload: RecipeApiError | null = null;

        try {
            payload = (await response.json()) as RecipeApiError;
        } catch {
            payload = null;
        }

        throw new Error(normalizeApiError(response.status, payload));
    }

    return (await response.json()) as RecipeWithIngredientsResponse;
}
