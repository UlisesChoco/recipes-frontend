const steps = [
    {
        title: "1. Crea tu cuenta",
        description: "Regístrate, inicia sesión y accede a tu espacio personal dentro de la plataforma.",
    },
    {
        title: "2. Publica tus recetas",
        description: "Comparte ingredientes, pasos, imágenes y toda la información necesaria para cocinar tu plato.",
    },
    {
        title: "3. Interactúa con la comunidad",
        description: "Otros usuarios pueden descubrir tus recetas, guardarlas y dejar valoraciones sobre ellas.",
    },
];

export function LandingHowItWorks() {
    return (
        <section id="how-it-works" aria-labelledby="how-it-works-title">
            <h2 id="how-it-works-title">Cómo funciona la plataforma</h2>
            <p>
                La experiencia está pensada para ser simple: entras, publicas, descubres contenido nuevo y recibes
                retroalimentación de otras personas.
            </p>

            <ol>
                {steps.map((step) => (
                    <li key={step.title}>
                        <article>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </article>
                    </li>
                ))}
            </ol>
        </section>
    );
}