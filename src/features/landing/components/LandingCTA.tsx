import { AppLink } from "../../shared/components/AppLink";

export function LandingCTA() {
    return (
        <section className="section-general" aria-labelledby="cta-title">
            <h2>¿Listo para compartir tu primera receta?</h2>
            <p>
                Crea tu cuenta, explora la comunidad y empieza a construir tu perfil como cocinero dentro de Recipes
                Social.
            </p>

            <div className="section-actions">
                <AppLink to="/register" variant="cta">
                    Crear cuenta
                </AppLink>
                <AppLink to="/login" variant="cta">
                    Ya tengo cuenta
                </AppLink>
            </div>
        </section>
    );
}