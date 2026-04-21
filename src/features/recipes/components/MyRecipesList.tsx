import type { MyRecipe } from "../service/recipe.types";
import { MyRecipeCard } from "./MyRecipeCard";

type MyRecipesListProps = {
    recipes: MyRecipe[];
    onDeleteSuccess?: () => void;
};

export function MyRecipesList({ recipes, onDeleteSuccess }: MyRecipesListProps) {
    if (recipes.length === 0) {
        return <p>Aun no has creado recetas.</p>;
    }

    return (
        <section aria-label="Listado de mis recetas">
            {recipes.map((recipe) => (
                <MyRecipeCard key={recipe.id} recipe={recipe} onDeleteSuccess={onDeleteSuccess} />
            ))}
        </section>
    );
}
