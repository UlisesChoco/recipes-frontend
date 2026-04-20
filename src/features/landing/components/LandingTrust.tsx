const trustPoints = [
    {
        title: "Sesión protegida",
        description: "El acceso por JWT encaja con un flujo de autenticación claro para usuarios registrados.",
    },
    {
        title: "Contenido controlado por usuario",
        description: "Cada receta pertenece a un perfil concreto, lo que ayuda a organizar y escalar la experiencia.",
    },
    {
        title: "Base lista para crecer",
        description: "La landing deja preparada la narrativa del producto para incorporar más pantallas más adelante.",
    },
];

export function LandingTrust() {
    return (
        <section id="trust" aria-labelledby="trust-title">
            <h2 id="trust-title">Seguridad y confianza en la experiencia</h2>
            <p>
                La aplicación está pensada alrededor de usuarios autenticados, por lo que la landing introduce desde
                el inicio una base clara sobre identidad, publicación y participación.
            </p>

            <div>
                {trustPoints.map((point) => (
                    <article key={point.title}>
                        <h3>{point.title}</h3>
                        <p>{point.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}