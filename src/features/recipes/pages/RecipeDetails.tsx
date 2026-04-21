import { useState } from "react";
import { useRecipeDetailsPage } from "../hooks/useRecipeDetailsPage";
import { RecipeDetailsEditorForm } from "../components/RecipeDetailsEditorForm";
import { RecipeRateForm } from "../components/RecipeRateForm";
import { RecipeDetailsSummary } from "../components/RecipeDetailsSummary";
import { RecipeRatingsSection } from "../components/RecipeRatingsSection";

export function RecipeDetails() {
    const [shareStatus, setShareStatus] = useState("");

    const {
        pageTitle,
        pageDescription,
        isOwnRecipeRoute,
        isValidRecipeId,
        authorFullName,
        recipeNotFoundMessage,
        recipeDetails,
    } = useRecipeDetailsPage();

    const {
        recipe,
        ratings,
        isLoading,
        error,
        values,
        errors,
        ingredientErrors,
        submitError,
        successMessage,
        isSubmitting,
        addIngredient,
        removeIngredient,
        handleChangeRecipeField,
        handleChangeImageFile,
        handleChangeIngredient,
        handleSubmit,
        refetch,
    } = recipeDetails;

    const handleShare = async (recipeId: number) => {
        const publicRecipeUrl = `${window.location.origin}/recipes/public/${recipeId}`;

        try {
            if (!navigator.clipboard?.writeText) {
                throw new Error("Clipboard API no disponible");
            }

            await navigator.clipboard.writeText(publicRecipeUrl);
            setShareStatus("Link copiado al portapapeles.");
        } catch {
            setShareStatus("No se pudo copiar el link.");
        }
    };

    if (!isValidRecipeId) {
        return (
            <section aria-labelledby="recipe-details-title">
                <h1 id="recipe-details-title">Detalles de la receta</h1>
                <p role="alert">El identificador de la receta no es valido.</p>
            </section>
        );
    }

    if (isLoading) {
        return (
            <section aria-labelledby="recipe-details-title">
                <h1 id="recipe-details-title">Detalles de la receta</h1>
                <p>Cargando informacion de la receta...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section aria-labelledby="recipe-details-title">
                <h1 id="recipe-details-title">Detalles de la receta</h1>
                <p role="alert">{error}</p>
            </section>
        );
    }

    if (!recipe) {
        return (
            <section aria-labelledby="recipe-details-title">
                <h1 id="recipe-details-title">Detalles de la receta</h1>
                <p>{recipeNotFoundMessage}</p>
            </section>
        );
    }

    return (
        <section className="section-general" aria-labelledby="recipe-details-title">
            <header>
                <h1 id="recipe-details-title">{pageTitle}</h1>
                <p>{pageDescription}</p>
                <button type="button" onClick={() => void handleShare(recipe.id)}>
                    Compartir
                </button>
                {shareStatus ? <p>{shareStatus}</p> : null}
            </header>

            <RecipeDetailsSummary recipe={recipe} authorFullName={authorFullName} />

            <RecipeRatingsSection ratings={ratings} />

            {isOwnRecipeRoute ? (
                <RecipeDetailsEditorForm
                    recipeImageName={recipe.image}
                    values={values}
                    errors={errors}
                    ingredientErrors={ingredientErrors}
                    submitError={submitError}
                    successMessage={successMessage}
                    isSubmitting={isSubmitting}
                    addIngredient={addIngredient}
                    removeIngredient={removeIngredient}
                    handleChangeRecipeField={handleChangeRecipeField}
                    handleChangeImageFile={handleChangeImageFile}
                    handleChangeIngredient={handleChangeIngredient}
                    handleSubmit={handleSubmit}
                />
            ) : (
                <RecipeRateForm recipeId={recipe.id} onRateSuccess={() => void refetch()} />
            )}
        </section>
    );
}