import type { IngredientFormValue } from "../service/create-recipe.types";

type CreateRecipeIngredientInputProps = {
    ingredient: IngredientFormValue;
    errors: Record<string, string>;
    onChange: (field: keyof IngredientFormValue, value: string) => void;
    onRemove: () => void;
};

export function CreateRecipeIngredientInput({
    ingredient,
    errors,
    onChange,
    onRemove,
}: CreateRecipeIngredientInputProps) {
    return (
        <article>
            <fieldset>
                <legend>Ingrediente</legend>

                <div>
                    <label htmlFor={`ingredient-name-${ingredient.id}`}>Nombre</label>
                    <input
                        id={`ingredient-name-${ingredient.id}`}
                        name="name"
                        type="text"
                        value={ingredient.name}
                        onChange={(event) => onChange("name", event.target.value)}
                        required
                    />
                    {errors.name && <p role="alert">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor={`ingredient-amount-${ingredient.id}`}>Cantidad</label>
                    <input
                        id={`ingredient-amount-${ingredient.id}`}
                        name="amount"
                        type="number"
                        step="0.01"
                        value={ingredient.amount}
                        onChange={(event) => onChange("amount", event.target.value)}
                        required
                    />
                    {errors.amount && <p role="alert">{errors.amount}</p>}
                </div>

                <div>
                    <label htmlFor={`ingredient-unit-${ingredient.id}`}>Unidad</label>
                    <input
                        id={`ingredient-unit-${ingredient.id}`}
                        name="unit"
                        type="text"
                        value={ingredient.unit}
                        onChange={(event) => onChange("unit", event.target.value)}
                        required
                    />
                    {errors.unit && <p role="alert">{errors.unit}</p>}
                </div>

                <button type="button" onClick={onRemove}>
                    Eliminar ingrediente
                </button>
            </fieldset>
        </article>
    );
}
