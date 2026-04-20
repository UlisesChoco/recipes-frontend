const heroStats = [
    { value: "Recetas", label: "subidas por la comunidad" },
    { value: "Valoraciones", label: "para descubrir platos destacados" },
    { value: "Perfiles", label: "de usuarios con identidad propia" },
];

export function LandingHero() {
    return (
        <section aria-labelledby="hero-title">
            <p>Recetas compartidas por personas reales</p>
            <h1 id="hero-title">Descubre, publica y valora recetas dentro de una comunidad gastronómica.</h1>
            <p>
                Recipes Social es una plataforma pensada para usuarios que quieren autentificarse, crear sus
                recetas y recibir feedback de otros cocineros dentro de un entorno social centrado en la cocina.
            </p>

            <div>
                <a href="/register">Crear cuenta</a>
                <a href="#how-it-works">Explorar la plataforma</a>
            </div>

            <ul aria-label="Resumen de capacidades de la plataforma">
                {heroStats.map((stat) => (
                    <li key={stat.label}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}