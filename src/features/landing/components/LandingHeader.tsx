import { AppLink } from "../../shared/components/AppLink";

const navigationItems = [
    { label: "Cómo funciona", href: "#how-it-works" },
    { label: "Qué puedes hacer", href: "#features" },
    { label: "Comunidad", href: "#community" },
    { label: "Seguridad", href: "#trust" },
];

export function LandingHeader() {
    return (
        <header>
            <div>
                <AppLink to="/" ariaLabel="Ir al inicio de Recipes Social" variant="nav">
                    Recipes Social
                </AppLink>
                <p>Una red social para descubrir, compartir y valorar recetas.</p>
            </div>

            <nav aria-label="Navegación principal">
                <ul>
                    {navigationItems.map((item) => (
                        <li key={item.href}>
                            <AppLink to={item.href} variant="nav">
                                {item.label}
                            </AppLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div>
                <AppLink to="/login" variant="cta">
                    Iniciar sesión
                </AppLink>
                <AppLink to="/register" variant="cta">
                    Crear cuenta
                </AppLink>
            </div>
        </header>
    );
}