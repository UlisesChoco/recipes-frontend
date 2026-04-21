import { useState } from "react";
import { getAuthToken } from "../../auth/service/auth-token.storage";
import { createRecipeRating } from "../service/recipes.service";

type UseRateRecipeFormOptions = {
    recipeId: number;
    onSuccess?: () => void;
};

type UseRateRecipeFormReturn = {
    score: string;
    comment: string;
    scoreError: string;
    commentError: string;
    submitError: string;
    successMessage: string;
    isSubmitting: boolean;
    setScore: (value: string) => void;
    setComment: (value: string) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

function validateScore(value: string): string {
    const parsed = Number.parseInt(value, 10);

    if (Number.isNaN(parsed)) {
        return "La puntuacion es obligatoria.";
    }

    if (parsed < 1 || parsed > 5) {
        return "La puntuacion debe estar entre 1 y 5.";
    }

    return "";
}

function validateComment(value: string): string {
    if (value.length > 255) {
        return "El comentario debe tener maximo 255 caracteres.";
    }

    return "";
}

export function useRateRecipeForm({ recipeId, onSuccess }: UseRateRecipeFormOptions): UseRateRecipeFormReturn {
    const [score, setScoreState] = useState("");
    const [comment, setCommentState] = useState("");
    const [scoreError, setScoreError] = useState("");
    const [commentError, setCommentError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setScore = (value: string) => {
        setScoreState(value);
        setScoreError("");
        setSubmitError("");
        setSuccessMessage("");
    };

    const setComment = (value: string) => {
        setCommentState(value);
        setCommentError("");
        setSubmitError("");
        setSuccessMessage("");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextScoreError = validateScore(score);
        const nextCommentError = validateComment(comment);

        setScoreError(nextScoreError);
        setCommentError(nextCommentError);

        if (nextScoreError || nextCommentError) {
            return;
        }

        const token = getAuthToken();

        if (!token) {
            setSubmitError("No hay una sesion activa para calificar la receta.");
            return;
        }

        try {
            setIsSubmitting(true);
            setSubmitError("");
            setSuccessMessage("");

            await createRecipeRating(token, {
                score: Number.parseInt(score, 10),
                comment,
                recipeId,
            });

            setScoreState("");
            setCommentState("");
            setSuccessMessage("Tu calificacion fue enviada correctamente.");
            onSuccess?.();
        } catch (error) {
            const message = error instanceof Error ? error.message : "No se pudo enviar la calificacion.";
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        score,
        comment,
        scoreError,
        commentError,
        submitError,
        successMessage,
        isSubmitting,
        setScore,
        setComment,
        handleSubmit,
    };
}