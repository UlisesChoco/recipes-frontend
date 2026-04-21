import { AppLink } from "../../shared/components/AppLink";
import { buildRecipeImageSrc } from "../service/recipes.service";
import type { PublicRecipe } from "../service/recipe.types";

type PublicRecipeCardProps = {
    recipe: PublicRecipe;
};

export function PublicRecipeCard({ recipe }: PublicRecipeCardProps) {
    const authorFullName = `${recipe.user.name} ${recipe.user.surname}`.trim();

    return (
        <article className="recipe-card">
            <header>
                <h2>{recipe.title}</h2>
                <p>Publicada por: {authorFullName}</p>
            </header>

            <p>{recipe.description}</p>

            <figure>
                <img src={buildRecipeImageSrc(recipe.image)} alt={`Imagen de la receta ${recipe.title}`} />
            </figure>

            <AppLink className="app-link" to={`/recipes/${recipe.id}`} variant="cta">
                Ver detalles
            </AppLink>
        </article>
    );
}