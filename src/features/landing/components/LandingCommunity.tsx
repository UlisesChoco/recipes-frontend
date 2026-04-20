const communityPoints = [
    "Publicación de recetas de cocina con enfoque social.",
    "Valoraciones de otros usuarios sobre cada receta compartida.",
    "Una experiencia preparada para crecer hacia favoritos, comentarios y perfiles.",
];

export function LandingCommunity() {
    return (
        <section id="community" aria-labelledby="community-title">
            <h2 id="community-title">Una comunidad centrada en compartir conocimiento culinario</h2>
            <p>
                La propuesta de valor no está solo en almacenar recetas, sino en convertir cada publicación en un
                punto de encuentro para descubrir técnicas, ideas y estilos de cocina distintos.
            </p>

            <ul>
                {communityPoints.map((point) => (
                    <li key={point}>{point}</li>
                ))}
            </ul>
        </section>
    );
}