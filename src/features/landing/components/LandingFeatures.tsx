const featureItems = [
    {
        title: "Autenticación",
        description: "La base del acceso a la aplicación está pensada para usuarios autenticados y sesiones seguras.",
    },
    {
        title: "Creación de recetas",
        description: "Cada usuario puede construir su perfil gastronómico publicando recetas propias y organizadas.",
    },
    {
        title: "Sistema de calificaciones",
        description: "La comunidad puede valorar recetas para destacar las más útiles, atractivas o creativas.",
    },
    {
        title: "Exploración social",
        description: "La landing presenta la idea general de una red social centrada en el contenido culinario.",
    },
];

export function LandingFeatures() {
    return (
        <section className="section-general" aria-labelledby="features-title">
            <h2>Qué puedes hacer dentro de Recipes Social</h2>
            <p>
                La plataforma reúne en una misma experiencia la autenticación, la publicación de contenido y la
                interacción social alrededor de la cocina.
            </p>

            <ul>
                {featureItems.map((feature) => (
                    <li key={feature.title}>
                        <article>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}