import type { IngredientFormValue } from "../service/create-recipe.types";
import { CreateRecipeIngredientInput } from "./CreateRecipeIngredientInput";

type FormErrors = {
    ingredients?: string;
};

type IngredientErrors = Record<string, Record<string, string>>;

type CreateRecipeIngredientsSectionProps = {
    ingredients: IngredientFormValue[];
    ingredientErrors: IngredientErrors;
    errors: FormErrors;
    onAddIngredient: () => void;
    onRemoveIngredient: (ingredientId: string) => void;
    onChangeIngredient: (ingredientId: string, field: keyof IngredientFormValue, value: string) => void;
};

export function CreateRecipeIngredientsSection({
    ingredients,
    ingredientErrors,
    errors,
    onAddIngredient,
    onRemoveIngredient,
    onChangeIngredient,
}: CreateRecipeIngredientsSectionProps) {
    return (
        <fieldset>
            <legend>Ingredientes (minimo 1 requerido)</legend>

            {errors.ingredients && <p role="alert">{errors.ingredients}</p>}

            <div>
                {ingredients.map((ingredient) => (
                    <CreateRecipeIngredientInput
                        key={ingredient.id}
                        ingredient={ingredient}
                        errors={ingredientErrors[ingredient.id] || {}}
                        onChange={(field, value) => onChangeIngredient(ingredient.id, field, value)}
                        onRemove={() => onRemoveIngredient(ingredient.id)}
                    />
                ))}
            </div>

            <button type="button" onClick={onAddIngredient}>
                Agregar ingrediente
            </button>
        </fieldset>
    );
}
