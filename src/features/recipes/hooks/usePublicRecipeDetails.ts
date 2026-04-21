import { useCallback, useEffect, useState } from "react";
import { getPublicRecipeById } from "../service/recipes.service";
import type { PublicRecipeDetails } from "../service/recipe.types";

type UsePublicRecipeDetailsOptions = {
    recipeId: number;
    enabled?: boolean;
};

type UsePublicRecipeDetailsReturn = {
    recipe: PublicRecipeDetails | null;
    isLoading: boolean;
    error: string;
    refetch: () => Promise<void>;
};

export function usePublicRecipeDetails({
    recipeId,
    enabled = true,
}: UsePublicRecipeDetailsOptions): UsePublicRecipeDetailsReturn {
    const [recipe, setRecipe] = useState<PublicRecipeDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchRecipe = useCallback(async () => {
        if (!enabled) {
            setRecipe(null);
            setError("");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError("");
            const response = await getPublicRecipeById(recipeId);
            setRecipe(response);
        } catch (fetchError) {
            const message = fetchError instanceof Error ? fetchError.message : "No se pudo cargar la receta.";
            setError(message);
            setRecipe(null);
        } finally {
            setIsLoading(false);
        }
    }, [enabled, recipeId]);

    useEffect(() => {
        void fetchRecipe();
    }, [fetchRecipe]);

    return {
        recipe,
        isLoading,
        error,
        refetch: fetchRecipe,
    };
}
