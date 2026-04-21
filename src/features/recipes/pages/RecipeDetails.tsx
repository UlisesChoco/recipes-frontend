import { useRecipeDetailsPage } from "../hooks/useRecipeDetailsPage";
import { RecipeDetailsEditorForm } from "../components/RecipeDetailsEditorForm";
import { RecipeDetailsSummary } from "../components/RecipeDetailsSummary";
import { RecipeRatingsSection } from "../components/RecipeRatingsSection";

export function RecipeDetails() {
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
    } = recipeDetails;

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
        <section aria-labelledby="recipe-details-title">
            <header>
                <h1 id="recipe-details-title">{pageTitle}</h1>
                <p>{pageDescription}</p>
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
            ) : null}
        </section>
    );
}