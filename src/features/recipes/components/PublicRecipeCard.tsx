import { AppLink } from "../../shared/components/AppLink";
import { buildRecipeImageSrc } from "../service/recipes.service";
import type { PublicRecipe } from "../service/recipe.types";

type PublicRecipeCardProps = {
    recipe: PublicRecipe;
};

export function PublicRecipeCard({ recipe }: PublicRecipeCardProps) {
    const authorFullName = `${recipe.user.name} ${recipe.user.surname}`.trim();

    return (
        <article>
            <header>
                <h2>{recipe.title}</h2>
                <p>Publicada por: {authorFullName}</p>
            </header>

            <p>{recipe.description}</p>

            <figure>
                <img src={buildRecipeImageSrc(recipe.image)} alt={`Imagen de la receta ${recipe.title}`} />
                <figcaption>Archivo de imagen: {recipe.image}</figcaption>
            </figure>

            <AppLink to={`/recipes/${recipe.id}`} variant="cta">
                Ver detalles
            </AppLink>

            <dl>
                {/* el id en la ui es temporal; por ahora lo muestro para debugging d: */}
                <div>
                    <dt>ID</dt>
                    <dd>{recipe.id}</dd>
                </div>
                <div>
                    <dt>Nombre del autor/a</dt>
                    <dd>{recipe.user.name}</dd>
                </div>
                <div>
                    <dt>Apellido del autor/a</dt>
                    <dd>{recipe.user.surname}</dd>
                </div>
            </dl>
        </article>
    );
}