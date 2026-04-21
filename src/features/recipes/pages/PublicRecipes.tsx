import { PublicRecipesList } from "../components/PublicRecipesList";
import { usePublicRecipes } from "../hooks/usePublicRecipes";

export function PublicRecipes() {
    const { recipes, isLoading, error, refetch } = usePublicRecipes();

    return (
        <section className="section-general" aria-labelledby="public-recipes-title">
            <header>
                <h1 id="public-recipes-title">Listado de recetas publicas</h1>
                <p>
                    Aqui puedes ver todas las recetas registradas en la plataforma, incluyendo autor e imagen
                    disponible.
                </p>
            </header>

            <button type="button" onClick={() => void refetch()} disabled={isLoading}>
                {isLoading ? "Actualizando..." : "Recargar recetas"}
            </button>

            {isLoading ? <p>Cargando recetas...</p> : null}
            {!isLoading && error ? <p role="alert">{error}</p> : null}
            {!isLoading && !error ? <PublicRecipesList recipes={recipes} /> : null}
        </section>
    );
}