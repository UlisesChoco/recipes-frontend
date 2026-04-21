import { useCallback, useEffect, useState } from "react";
import { getAuthToken } from "../../auth/service/auth-token.storage";
import { getRecipeById, getRecipeRatings, updateRecipe } from "../service/recipes.service";
import type { CreateRecipeRequest } from "../service/create-recipe.types";
import type { RecipeDetails, RecipeRating } from "../service/recipe.types";
import type { IngredientFormValue } from "../service/create-recipe.types";

type FormErrors = {
    title?: string;
    description?: string;
    imageFile?: string;
    ingredients?: string;
};

type IngredientErrors = Record<string, Record<string, string>>;

type RecipeFormValues = {
    title: string;
    description: string;
    imageFile: File | null;
    ingredients: IngredientFormValue[];
};

type UseRecipeDetailsOptions = {
    recipeId: number;
    allowEditing: boolean;
    enabled?: boolean;
};

type UseRecipeDetailsReturn = {
    recipe: RecipeDetails | null;
    ratings: RecipeRating[];
    isLoading: boolean;
    error: string;
    values: RecipeFormValues;
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
    refetch: () => Promise<void>;
};

const DEFAULT_VALUES: RecipeFormValues = {
    title: "",
    description: "",
    imageFile: null,
    ingredients: [],
};

function generateIngredientId(): string {
    return `ingredient-${Date.now()}-${Math.random()}`;
}

function buildValues(recipe: RecipeDetails | null): RecipeFormValues {
    if (!recipe) {
        return DEFAULT_VALUES;
    }

    return {
        title: recipe.title,
        description: recipe.description,
        imageFile: null,
        ingredients: recipe.ingredients.map((ingredient) => ({
            id: generateIngredientId(),
            name: ingredient.name,
            amount: ingredient.amount.toString(),
            unit: ingredient.unit,
        })),
    };
}

function validateTitle(value: string): string | undefined {
    if (!value.trim()) {
        return "El titulo es obligatorio.";
    }

    if (value.length > 100) {
        return "El titulo debe tener maximo 100 caracteres.";
    }

    return undefined;
}

function validateDescription(value: string): string | undefined {
    if (!value.trim()) {
        return "La descripcion es obligatoria.";
    }

    if (value.length > 255) {
        return "La descripcion debe tener maximo 255 caracteres.";
    }

    return undefined;
}

function validateImageFile(file: File | null): string | undefined {
    if (!file) {
        return undefined;
    }

    if (!file.type.startsWith("image/")) {
        return "El archivo debe ser una imagen.";
    }

    return undefined;
}

function validateIngredients(ingredients: IngredientFormValue[]): { globalError?: string; errors: IngredientErrors } {
    const errors: IngredientErrors = {};

    if (ingredients.length === 0) {
        return {
            globalError: "Debes agregar al menos un ingrediente.",
            errors: {},
        };
    }

    ingredients.forEach((ingredient) => {
        const ingredientErrors: Record<string, string> = {};

        if (!ingredient.name.trim()) {
            ingredientErrors.name = "El nombre es obligatorio.";
        } else if (ingredient.name.length > 50) {
            ingredientErrors.name = "El nombre debe tener maximo 50 caracteres.";
        }

        const amount = Number.parseFloat(ingredient.amount);
        if (Number.isNaN(amount) || amount <= 0) {
            ingredientErrors.amount = "Debe ser un numero mayor a 0.";
        }

        if (!ingredient.unit.trim()) {
            ingredientErrors.unit = "La unidad es obligatoria.";
        } else if (ingredient.unit.length > 10) {
            ingredientErrors.unit = "La unidad debe tener maximo 10 caracteres.";
        }

        if (Object.keys(ingredientErrors).length > 0) {
            errors[ingredient.id] = ingredientErrors;
        }
    });

    return { errors };
}

export function useRecipeDetails({ recipeId, allowEditing, enabled = true }: UseRecipeDetailsOptions): UseRecipeDetailsReturn {
    const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
    const [ratings, setRatings] = useState<RecipeRating[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [values, setValues] = useState<RecipeFormValues>(DEFAULT_VALUES);
    const [errors, setErrors] = useState<FormErrors>({});
    const [ingredientErrors, setIngredientErrors] = useState<IngredientErrors>({});
    const [submitError, setSubmitError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchData = useCallback(async () => {
        if (!enabled) {
            setRecipe(null);
            setRatings([]);
            setIsLoading(false);
            return;
        }

        const token = getAuthToken();

        if (!token) {
            setRecipe(null);
            setRatings([]);
            setError("No hay una sesion activa para consultar la receta.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            const [recipeResponse, ratingsResponse] = await Promise.all([
                getRecipeById(token, recipeId),
                getRecipeRatings(token, recipeId),
            ]);

            setRecipe(recipeResponse);
            setRatings(ratingsResponse);
        } catch (fetchError) {
            const message = fetchError instanceof Error ? fetchError.message : "No se pudo cargar la receta.";
            setError(message);
            setRecipe(null);
            setRatings([]);
        } finally {
            setIsLoading(false);
        }
    }, [enabled, recipeId]);

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (!allowEditing) {
            return;
        }

        setValues(buildValues(recipe));
        setErrors({});
        setIngredientErrors({});
        setSubmitError("");
        setSuccessMessage("");
    }, [allowEditing, recipe]);

    const addIngredient = () => {
        const newIngredient: IngredientFormValue = {
            id: generateIngredientId(),
            name: "",
            amount: "",
            unit: "",
        };

        setValues((previous) => ({
            ...previous,
            ingredients: [...previous.ingredients, newIngredient],
        }));
    };

    const removeIngredient = (ingredientId: string) => {
        setValues((previous) => ({
            ...previous,
            ingredients: previous.ingredients.filter((ingredient) => ingredient.id !== ingredientId),
        }));

        setIngredientErrors((previous) => {
            const nextErrors = { ...previous };
            delete nextErrors[ingredientId];
            return nextErrors;
        });
    };

    const handleChangeRecipeField = (field: "title" | "description", value: string) => {
        setValues((previous) => ({ ...previous, [field]: value }));
        setErrors((previous) => ({ ...previous, [field]: undefined }));
        setSubmitError("");
    };

    const handleChangeImageFile = (file: File | null) => {
        setValues((previous) => ({ ...previous, imageFile: file }));
        setErrors((previous) => ({ ...previous, imageFile: undefined }));
        setSubmitError("");
    };

    const handleChangeIngredient = (ingredientId: string, field: keyof IngredientFormValue, value: string) => {
        setValues((previous) => ({
            ...previous,
            ingredients: previous.ingredients.map((ingredient) =>
                ingredient.id === ingredientId ? { ...ingredient, [field]: value } : ingredient
            ),
        }));

        setIngredientErrors((previous) => {
            const nextErrors = { ...previous };

            if (nextErrors[ingredientId]) {
                delete nextErrors[ingredientId][field];

                if (Object.keys(nextErrors[ingredientId]).length === 0) {
                    delete nextErrors[ingredientId];
                }
            }

            return nextErrors;
        });

        setSubmitError("");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!allowEditing || !recipe) {
            return;
        }

        const titleError = validateTitle(values.title);
        const descriptionError = validateDescription(values.description);
        const imageError = validateImageFile(values.imageFile);
        const ingredientsValidation = validateIngredients(values.ingredients);

        const nextErrors: FormErrors = {};
        if (titleError) nextErrors.title = titleError;
        if (descriptionError) nextErrors.description = descriptionError;
        if (imageError) nextErrors.imageFile = imageError;
        if (ingredientsValidation.globalError) nextErrors.ingredients = ingredientsValidation.globalError;

        setErrors(nextErrors);
        setIngredientErrors(ingredientsValidation.errors);

        if (Object.keys(nextErrors).length > 0 || Object.keys(ingredientsValidation.errors).length > 0) {
            return;
        }

        const token = getAuthToken();
        if (!token) {
            setSubmitError("No hay una sesion activa para actualizar la receta.");
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitError("");
            setSuccessMessage("");

            const payload: CreateRecipeRequest = {
                title: values.title,
                description: values.description,
                ingredients: values.ingredients.map((ingredient) => ({
                    name: ingredient.name,
                    amount: Number.parseFloat(ingredient.amount),
                    unit: ingredient.unit,
                })),
            };

            const updatedRecipe = await updateRecipe(token, recipe.id, payload, values.imageFile);

            setRecipe((previous) =>
                previous
                    ? {
                          ...previous,
                          ...updatedRecipe,
                      }
                    : previous
            );
            setValues(buildValues({ ...recipe, ...updatedRecipe }));
            setSuccessMessage("La receta fue actualizada correctamente.");
        } catch (submitErrorValue) {
            const message = submitErrorValue instanceof Error ? submitErrorValue.message : "No se pudo actualizar la receta.";
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
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
        refetch: fetchData,
    };
}