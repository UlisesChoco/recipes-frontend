import { useState } from "react";
import { createRecipe } from "../service/create-recipe.service";
import type { CreateRecipeFormValues, IngredientFormValue } from "../service/create-recipe.types";

type FormErrors = {
    title?: string;
    description?: string;
    imageFile?: string;
    ingredients?: string;
};

type IngredientErrors = Record<string, Record<string, string>>;

const DEFAULT_VALUES: CreateRecipeFormValues = {
    title: "",
    description: "",
    imageFile: null,
    ingredients: [],
};

function generateIngredientId(): string {
    return `ingredient-${Date.now()}-${Math.random()}`;
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
        return "La imagen es obligatoria.";
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

    ingredients.forEach((ing) => {
        const ingErrors: Record<string, string> = {};

        if (!ing.name.trim()) {
            ingErrors.name = "El nombre es obligatorio.";
        } else if (ing.name.length > 50) {
            ingErrors.name = "El nombre debe tener maximo 50 caracteres.";
        }

        const amount = parseFloat(ing.amount);
        if (isNaN(amount) || amount <= 0) {
            ingErrors.amount = "Debe ser un numero mayor a 0.";
        }

        if (!ing.unit.trim()) {
            ingErrors.unit = "La unidad es obligatoria.";
        } else if (ing.unit.length > 10) {
            ingErrors.unit = "La unidad debe tener maximo 10 caracteres.";
        }

        if (Object.keys(ingErrors).length > 0) {
            errors[ing.id] = ingErrors;
        }
    });

    return { errors };
}

type UseCreateRecipeFormOptions = {
    onSuccess?: () => void;
};

export function useCreateRecipeForm(options?: UseCreateRecipeFormOptions) {
    const [values, setValues] = useState<CreateRecipeFormValues>(DEFAULT_VALUES);
    const [errors, setErrors] = useState<FormErrors>({});
    const [ingredientErrors, setIngredientErrors] = useState<IngredientErrors>({});
    const [submitError, setSubmitError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addIngredient = () => {
        const newIngredient: IngredientFormValue = {
            id: generateIngredientId(),
            name: "",
            amount: "",
            unit: "",
        };

        setValues((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, newIngredient],
        }));
    };

    const removeIngredient = (ingredientId: string) => {
        setValues((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter((ing) => ing.id !== ingredientId),
        }));

        setIngredientErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[ingredientId];
            return newErrors;
        });
    };

    const handleChangeRecipeField = (field: "title" | "description", value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
        setSubmitError("");
    };

    const handleChangeImageFile = (file: File | null) => {
        setValues((prev) => ({ ...prev, imageFile: file }));
        setErrors((prev) => ({ ...prev, imageFile: undefined }));
        setSubmitError("");
    };

    const handleChangeIngredient = (ingredientId: string, field: keyof IngredientFormValue, value: string) => {
        setValues((prev) => ({
            ...prev,
            ingredients: prev.ingredients.map((ing) =>
                ing.id === ingredientId ? { ...ing, [field]: value } : ing
            ),
        }));

        setIngredientErrors((prev) => {
            const newErrors = { ...prev };
            if (newErrors[ingredientId]) {
                delete newErrors[ingredientId][field];
                if (Object.keys(newErrors[ingredientId]).length === 0) {
                    delete newErrors[ingredientId];
                }
            }
            return newErrors;
        });
        setSubmitError("");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const titleError = validateTitle(values.title);
        const descriptionError = validateDescription(values.description);
        const imageError = validateImageFile(values.imageFile);
        const ingredientsValidation = validateIngredients(values.ingredients);

        const newErrors: FormErrors = {};
        if (titleError) newErrors.title = titleError;
        if (descriptionError) newErrors.description = descriptionError;
        if (imageError) newErrors.imageFile = imageError;
        if (ingredientsValidation.globalError) newErrors.ingredients = ingredientsValidation.globalError;

        setErrors(newErrors);
        setIngredientErrors(ingredientsValidation.errors);

        if (Object.keys(newErrors).length > 0 || Object.keys(ingredientsValidation.errors).length > 0) {
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitError("");
            setSuccessMessage("");

            const payload = {
                title: values.title,
                description: values.description,
                ingredients: values.ingredients.map((ing) => ({
                    name: ing.name,
                    amount: parseFloat(ing.amount),
                    unit: ing.unit,
                })),
            };

            await createRecipe(payload, values.imageFile!);

            setSuccessMessage("Tu receta fue creada correctamente.");
            setValues(DEFAULT_VALUES);
            options?.onSuccess?.();
        } catch (error) {
            const message = error instanceof Error ? error.message : "No se pudo crear la receta.";
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
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
    };
}
