import { useCallback, useEffect, useState } from "react";
import { getAuthToken } from "../../auth/service/auth-token.storage";
import { getPublicRecipes } from "../service/recipes.service";
import type { PublicRecipe } from "../service/recipe.types";

export function usePublicRecipes() {
    const [recipes, setRecipes] = useState<PublicRecipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchRecipes = useCallback(async () => {
        const token = getAuthToken();

        if (!token) {
            setRecipes([]);
            setError("No hay una sesion activa para consultar recetas.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError("");
            const response = await getPublicRecipes(token);
            setRecipes(response);
        } catch (fetchError) {
            const message = fetchError instanceof Error ? fetchError.message : "No se pudieron cargar las recetas.";
            setError(message);
            setRecipes([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchRecipes();
    }, [fetchRecipes]);

    return {
        recipes,
        isLoading,
        error,
        refetch: fetchRecipes,
    };
}