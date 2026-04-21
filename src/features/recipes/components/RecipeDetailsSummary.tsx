import { buildRecipeImageSrc } from "../service/recipes.service";
import type { RecipeDetails } from "../service/recipe.types";

type RecipeDetailsSummaryProps = {
    recipe: RecipeDetails;
    authorFullName: string;
};

export function RecipeDetailsSummary({ recipe, authorFullName }: RecipeDetailsSummaryProps) {
    return (
        <article className="recipe-card">
            <header>
                <h2>{recipe.title}</h2>
                <p>Autor/a: {authorFullName}</p>
            </header>

            <p>{recipe.description}</p>

            <figure>
                <img src={buildRecipeImageSrc(recipe.image)} alt={`Imagen de la receta ${recipe.title}`} />
            </figure>

            <section aria-labelledby="recipe-ingredients-title">
                <h3 id="recipe-ingredients-title">Ingredientes</h3>

                {recipe.ingredients.length === 0 ? (
                    <p>Esta receta aun no tiene ingredientes registrados.</p>
                ) : (
                    <ul>
                        {recipe.ingredients.map((ingredient) => (
                            <li key={`${ingredient.name}-${ingredient.amount}-${ingredient.unit}`}>
                                {ingredient.amount} {ingredient.unit} de {ingredient.name}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </article>
    );
}