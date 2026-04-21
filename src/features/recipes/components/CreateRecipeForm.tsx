import { useNavigate } from "react-router-dom";
import { useCreateRecipeForm } from "../hooks/useCreateRecipeForm";
import { CreateRecipeFormFields } from "./CreateRecipeFormFields";
import { CreateRecipeIngredientsSection } from "./CreateRecipeIngredientsSection";

export function CreateRecipeForm() {
    const navigate = useNavigate();

    const {
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
    } = useCreateRecipeForm({
        onSuccess: () => navigate("/recipes"),
    });

    return (
        <form onSubmit={handleSubmit} noValidate>
            <fieldset disabled={isSubmitting}>
                <legend>Formulario para crear nueva receta</legend>

                <CreateRecipeFormFields
                    values={values}
                    errors={errors}
                    onChangeTitle={(value) => handleChangeRecipeField("title", value)}
                    onChangeDescription={(value) => handleChangeRecipeField("description", value)}
                    onChangeImage={(file) => handleChangeImageFile(file)}
                />

                <CreateRecipeIngredientsSection
                    ingredients={values.ingredients}
                    ingredientErrors={ingredientErrors}
                    errors={errors}
                    onAddIngredient={addIngredient}
                    onRemoveIngredient={removeIngredient}
                    onChangeIngredient={handleChangeIngredient}
                />

                <button type="submit">{isSubmitting ? "Creando receta..." : "Crear receta"}</button>
            </fieldset>

            {submitError && <p role="alert">{submitError}</p>}
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
}
