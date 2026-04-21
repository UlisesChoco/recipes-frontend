import { AppLink } from "../../shared/components/AppLink";

const navigationItems = [
    { label: "Cómo funciona", href: "#how-it-works" },
    { label: "Qué puedes hacer", href: "#features" },
    { label: "Comunidad", href: "#community" },
    { label: "Seguridad", href: "#trust" },
];

export function LandingHeader() {
    return (
        <header className="app-main-header">
            <nav className="app-main-header__nav" aria-label="Navegación principal">
                <div className="app-main-header__brand">
                    <AppLink to="/" ariaLabel="Ir al inicio de Recipes Social" variant="nav">
                        Recipes Social
                    </AppLink>
                    <p>Una red social para descubrir, compartir y valorar recetas.</p>
                </div>

                
                <ul className="app-main-header__links">
                    {navigationItems.map((item) => (
                        <li key={item.href}>
                            <AppLink to={item.href} variant="nav">
                                {item.label}
                            </AppLink>
                        </li>
                    ))}
                </ul>
                

                <ul className="app-main-header__links">
                    <li>
                        <AppLink to="/login" variant="nav">
                            Iniciar sesión
                        </AppLink>
                    </li>
                    <li>
                        <AppLink to="/register" variant="nav">
                            Crear cuenta
                        </AppLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}