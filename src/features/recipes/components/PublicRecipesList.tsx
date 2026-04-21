import type { PublicRecipe } from "../service/recipe.types";
import { PublicRecipeCard } from "./PublicRecipeCard";

type PublicRecipesListProps = {
    recipes: PublicRecipe[];
};

export function PublicRecipesList({ recipes }: PublicRecipesListProps) {
    if (recipes.length === 0) {
        return <p>No hay recetas publicas disponibles en este momento.</p>;
    }

    return (
        <section aria-label="Listado de recetas publicas">
            {recipes.map((recipe) => (
                <PublicRecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </section>
    );
}