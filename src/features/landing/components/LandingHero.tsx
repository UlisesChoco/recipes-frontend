import { AppLink } from "../../shared/components/AppLink";

const heroStats = [
    { value: "Recetas", label: " subidas por la comunidad" },
    { value: "Valoraciones", label: " para descubrir platos destacados" },
    { value: "Perfiles", label: " de usuarios con identidad propia" },
];

export function LandingHero() {
    return (
        <section className="section-general" aria-labelledby="hero-title">
            <p>Recetas compartidas por personas reales</p>
            <h1>Descubre, publica y valora recetas dentro de una comunidad gastronómica.</h1>
            <p>
                Recipes Social es una plataforma pensada para usuarios que quieren autentificarse, crear sus
                recetas y recibir feedback de otros cocineros dentro de un entorno social centrado en la cocina.
            </p>

            <div className="section-actions">
                <AppLink className="app-link" to="/register" variant="nav">Crear cuenta</AppLink>
                <AppLink className="app-link" to="#how-it-works" variant="nav">Explorar la plataforma</AppLink>
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