import type { RecipeRating } from "../service/recipe.types";

type RecipeRatingsSectionProps = {
    ratings: RecipeRating[];
};

export function RecipeRatingsSection({ ratings }: RecipeRatingsSectionProps) {
    return (
        <section className="recipe-card" aria-labelledby="recipe-ratings-title">
            <h3>Calificaciones</h3>

            {ratings.length === 0 ? (
                <p>Esta receta aun no tiene calificaciones.</p>
            ) : (
                <div>
                    {ratings.map((rating, index) => {
                        const ratingAuthor = `${rating.user.name} ${rating.user.surname}`.trim();

                        return (
                            <article className="recipe-card" key={`${ratingAuthor}-${rating.score}-${index}`}>
                                <header>
                                    <p>
                                        <strong>{rating.score}/5</strong> por {ratingAuthor}
                                    </p>
                                </header>
                                <p>{rating.comment}</p>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}