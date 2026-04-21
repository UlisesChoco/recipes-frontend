import { useState } from "react";
import { getAuthToken } from "../../auth/service/auth-token.storage";
import { deleteRecipe } from "../service/recipes.service";

type UseDeleteRecipeReturn = {
    isDeleting: boolean;
    deleteError: string;
    handleDelete: (recipeId: number) => Promise<void>;
};

export function useDeleteRecipe(onDeleteSuccess?: () => void): UseDeleteRecipeReturn {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const handleDelete = async (recipeId: number) => {
        const confirmed = window.confirm(
            "Esta es una acción irreversible. Eliminar la receta eliminará todos sus ingredientes y calificaciones asociadas. ¿Está seguro/a de proceder?"
        );

        if (!confirmed) {
            return;
        }

        const token = getAuthToken();
        if (!token) {
            setDeleteError("No hay una sesion activa para eliminar la receta.");
            return;
        }

        try {
            setIsDeleting(true);
            setDeleteError("");
            await deleteRecipe(token, recipeId);
            onDeleteSuccess?.();
        } catch (error) {
            const message = error instanceof Error ? error.message : "No se pudo eliminar la receta.";
            setDeleteError(message);
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        isDeleting,
        deleteError,
        handleDelete,
    };
}
