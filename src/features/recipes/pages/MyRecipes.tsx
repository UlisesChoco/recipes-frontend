import { MyRecipesList } from "../components/MyRecipesList";
import { useMyRecipes } from "../hooks/useMyRecipes";

export function MyRecipes() {
    const { recipes, isLoading, error, refetch } = useMyRecipes();

    return (
        <section aria-labelledby="my-recipes-title">
            <header>
                <h1 id="my-recipes-title">Mis recetas</h1>
                <p>Aqui puedes ver todas las recetas que has creado.</p>
            </header>

            <button type="button" onClick={() => void refetch()} disabled={isLoading}>
                {isLoading ? "Actualizando..." : "Recargar mis recetas"}
            </button>

            {isLoading ? <p>Cargando tus recetas...</p> : null}
            {!isLoading && error ? <p role="alert">{error}</p> : null}
            {!isLoading && !error ? <MyRecipesList recipes={recipes} onDeleteSuccess={refetch} /> : null}
        </section>
    );
}