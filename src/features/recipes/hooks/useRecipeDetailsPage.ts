import { useMatch, useParams } from "react-router-dom";
import { useRecipeDetails } from "./useRecipeDetails";

type UseRecipeDetailsPageReturn = {
    pageTitle: string;
    pageDescription: string;
    isOwnRecipeRoute: boolean;
    isValidRecipeId: boolean;
    recipeImageName: string;
    authorFullName: string;
    recipeNotFoundMessage: string;
    recipeDetails: ReturnType<typeof useRecipeDetails>;
};

export function useRecipeDetailsPage(): UseRecipeDetailsPageReturn {
    const params = useParams();
    const isOwnRecipeRoute = useMatch("/recipes/me/:id") !== null;
    const parsedRecipeId = Number(params.id);
    const isValidRecipeId = !Number.isNaN(parsedRecipeId);
    const recipeId = isValidRecipeId ? parsedRecipeId : 0;

    const recipeDetails = useRecipeDetails({
        recipeId,
        allowEditing: isOwnRecipeRoute,
        enabled: isValidRecipeId,
    });

    const recipe = recipeDetails.recipe;
    const authorFullName = recipe ? `${recipe.user.name} ${recipe.user.surname}`.trim() : "";

    return {
        pageTitle: isOwnRecipeRoute ? "Modificar receta" : "Detalles de la receta",
        pageDescription: isOwnRecipeRoute
            ? "Aqui puedes revisar la receta y modificar titulo, descripcion, imagen e ingredientes. Las calificaciones permanecen solo lectura."
            : "Aqui puedes revisar toda la informacion publica de la receta, incluyendo autor, ingredientes y calificaciones.",
        isOwnRecipeRoute,
        isValidRecipeId,
        recipeImageName: recipe?.image ?? "",
        authorFullName,
        recipeNotFoundMessage: "No se encontro la receta solicitada.",
        recipeDetails,
    };
}