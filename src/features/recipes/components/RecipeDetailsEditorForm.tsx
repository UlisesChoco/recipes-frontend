import { AppButton } from "../../shared/components/AppButton";
import { CreateRecipeFormFields } from "./CreateRecipeFormFields";
import { CreateRecipeIngredientsSection } from "./CreateRecipeIngredientsSection";
import type { CreateRecipeFormValues, IngredientFormValue } from "../service/create-recipe.types";

type FormErrors = {
    title?: string;
    description?: string;
    imageFile?: string;
    ingredients?: string;
};

type IngredientErrors = Record<string, Record<string, string>>;

type RecipeDetailsEditorFormProps = {
    recipeImageName: string;
    values: CreateRecipeFormValues;
    errors: FormErrors;
    ingredientErrors: IngredientErrors;
    submitError: string;
    successMessage: string;
    isSubmitting: boolean;
    addIngredient: () => void;
    removeIngredient: (ingredientId: string) => void;
    handleChangeRecipeField: (field: "title" | "description", value: string) => void;
    handleChangeImageFile: (file: File | null) => void;
    handleChangeIngredient: (ingredientId: string, field: keyof IngredientFormValue, value: string) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export function RecipeDetailsEditorForm({
    recipeImageName,
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
}: RecipeDetailsEditorFormProps) {
    return (
        <form onSubmit={handleSubmit} noValidate>
            <fieldset disabled={isSubmitting}>
                <legend>Edicion de la receta</legend>

                <CreateRecipeFormFields
                    values={values}
                    errors={errors}
                    onChangeTitle={(value) => handleChangeRecipeField("title", value)}
                    onChangeDescription={(value) => handleChangeRecipeField("description", value)}
                    onChangeImage={(file) => handleChangeImageFile(file)}
                    imageRequired={false}
                    currentImageName={recipeImageName}
                    currentImageLabel="Imagen actual"
                />

                <CreateRecipeIngredientsSection
                    ingredients={values.ingredients}
                    ingredientErrors={ingredientErrors}
                    errors={errors}
                    onAddIngredient={addIngredient}
                    onRemoveIngredient={removeIngredient}
                    onChangeIngredient={handleChangeIngredient}
                />

                <AppButton type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? "Guardando cambios..." : "Guardar cambios"}
                </AppButton>
            </fieldset>

            {submitError && <p role="alert">{submitError}</p>}
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
}