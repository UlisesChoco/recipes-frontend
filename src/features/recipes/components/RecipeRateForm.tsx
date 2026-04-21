import { AppButton } from "../../shared/components/AppButton";
import { useRateRecipeForm } from "../hooks/useRateRecipeForm";

type RecipeRateFormProps = {
    recipeId: number;
    onRateSuccess?: () => void;
};

export function RecipeRateForm({ recipeId, onRateSuccess }: RecipeRateFormProps) {
    const {
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
    } = useRateRecipeForm({
        recipeId,
        onSuccess: onRateSuccess,
    });

    return (
        <form onSubmit={handleSubmit} noValidate>
            <fieldset disabled={isSubmitting}>
                <legend>Calificar receta</legend>

                <div>
                    <label htmlFor="recipe-rate-score">Puntuacion (1 a 5)</label>
                    <select
                        id="recipe-rate-score"
                        value={score}
                        onChange={(event) => setScore(event.target.value)}
                        required
                    >
                        <option value="">Selecciona una opcion</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {scoreError && <p role="alert">{scoreError}</p>}
                </div>

                <div>
                    <label htmlFor="recipe-rate-comment">Comentario (opcional)</label>
                    <textarea
                        id="recipe-rate-comment"
                        maxLength={255}
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                    <p>{comment.length}/255</p>
                    {commentError && <p role="alert">{commentError}</p>}
                </div>

                <AppButton type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando calificacion..." : "Enviar calificacion"}
                </AppButton>
            </fieldset>

            {submitError && <p role="alert">{submitError}</p>}
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
}