import { AppButton } from "../../shared/components/AppButton";
import { AppLink } from "../../shared/components/AppLink";
import { buildRecipeImageSrc } from "../service/recipes.service";
import { useDeleteRecipe } from "../hooks/useDeleteRecipe";
import type { MyRecipe } from "../service/recipe.types";

type MyRecipeCardProps = {
    recipe: MyRecipe;
    onDeleteSuccess?: () => void;
};

export function MyRecipeCard({ recipe, onDeleteSuccess }: MyRecipeCardProps) {
    const { isDeleting, deleteError, handleDelete } = useDeleteRecipe(onDeleteSuccess);

    return (
        <article className="recipe-card">
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <img src={buildRecipeImageSrc(recipe.image)} alt={`Imagen de la receta ${recipe.title}`} />

            <div>
                <AppLink to={`/recipes/me/${recipe.id}`} variant="cta">
                    Modificar
                </AppLink>
                <AppButton
                    variant="danger"
                    disabled={isDeleting}
                    onClick={() => handleDelete(recipe.id)}
                >
                    {isDeleting ? "Eliminando..." : "Eliminar"}
                </AppButton>
            </div>

            {deleteError && <p role="alert">{deleteError}</p>}
        </article>
    );
}
