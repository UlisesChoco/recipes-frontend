import { useParams } from "react-router-dom";
import { RecipeDetailsSummary } from "../components/RecipeDetailsSummary";
import { usePublicRecipeDetails } from "../hooks/usePublicRecipeDetails";

export function PublicRecipeDetails() {
    const params = useParams();
    const parsedRecipeId = Number(params.id);
    const isValidRecipeId = !Number.isNaN(parsedRecipeId);

    const { recipe, isLoading, error } = usePublicRecipeDetails({
        recipeId: isValidRecipeId ? parsedRecipeId : 0,
        enabled: isValidRecipeId,
    });

    if (!isValidRecipeId) {
        return (
            <section className="section-general" aria-labelledby="public-recipe-details-title">
                <h1 id="public-recipe-details-title">Receta pública</h1>
                <p role="alert">El identificador de la receta no es valido.</p>
            </section>
        );
    }

    if (isLoading) {
        return (
            <section className="section-general" aria-labelledby="public-recipe-details-title">
                <h1 id="public-recipe-details-title">Receta pública</h1>
                <p>Cargando receta...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="section-general" aria-labelledby="public-recipe-details-title">
                <h1 id="public-recipe-details-title">Receta pública</h1>
                <p role="alert">{error}</p>
            </section>
        );
    }

    if (!recipe) {
        return (
            <section className="section-general" aria-labelledby="public-recipe-details-title">
                <h1 id="public-recipe-details-title">Receta pública</h1>
                <p>No se encontro la receta solicitada.</p>
            </section>
        );
    }

    const authorFullName = `${recipe.user.name} ${recipe.user.surname}`.trim();

    return (
        <section className="section-general" aria-labelledby="public-recipe-details-title">
            <header>
                <h1 id="public-recipe-details-title">Receta pública compartida</h1>
                <p>Esta receta fue compartida públicamente por un usuario de la plataforma.</p>
            </header>

            <RecipeDetailsSummary recipe={recipe} authorFullName={authorFullName} />
        </section>
    );
}